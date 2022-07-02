using Cli.NET.Tools;
using Jint;
using Jint.Native;
using MelonJs.Models.Extensions;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.Static.Jint;
using System.Text.Json;

namespace MelonJs.WebApps {
    public static class WebApplicationManager
    {
        static void Main(string[] args) {}
        public static void ExecuteWebApplication
            (string name, string host, int port, string routes, string echoes, bool enableHttps = false)
        {
            var parsedRoutes = JsonSerializer.Deserialize<List<HttpRoute>>(routes);
            var parsedEchoes = JsonSerializer.Deserialize<List<HttpEcho>>(echoes);

            var app = new MelonHttpApplication(name, host, port, parsedRoutes ?? new(), parsedEchoes ?? new(), enableHttps);
            var httpsCondition = app.EnableHttps ? "s" : string.Empty;

            var engine = JintStatic.CurrentJintEngine;
            var builder = WebApplication.CreateBuilder(Array.Empty<string>());

            var webApp = builder.Build();

            /*
             * Enable HTTPS redirection for the internally created web application
             * Obs: Will require a valid HTTPS certificate to work in a server
             */
            if (app.EnableHttps)
                webApp.UseHttpsRedirection();

            webApp.Urls.Add($"http{httpsCondition}://{app.Host}:{app.Port}");

            if (app.Echoes.Any())
                app.Echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.Host}:{x.Port}"));

            webApp.SetupRoutes(name, app.Routes, engine);

            Console.WriteLine();
            CLNConsole.Write("[MelonRuntime ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application with default: ", ConsoleColor.Green);
            CLNConsole.Write(webApp.Urls.ElementAt(0), ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();

            webApp.Run();
        }

        private static IResult GetHttpResult(JsValue obj)
        {
            var httpResult = obj.AsObject();

            return (double)httpResult.Get("status").AsNumber() switch
            {
                200 => GetSpecificResult(httpResult),
                404 => Results.NotFound(httpResult.Get("response").AsString()),
                401 => Results.Unauthorized(),
                400 => Results.BadRequest(httpResult.Get("response").AsString()),
                409 => Results.Conflict(httpResult.Get("response").AsString()),
                204 => Results.NoContent(),
                422 => Results.UnprocessableEntity(httpResult.Get("response").AsString()),
                _ => Results.Problem(httpResult.Get("response").AsString(), 
                    statusCode: Convert.ToInt32(httpResult.Get("status").AsNumber()))
            };
        }

        private static IResult GetSpecificResult(JsValue httpResult)
        {
            var type = httpResult.Get("type").AsString();
            var response = httpResult.Get("response").AsString();
            return type switch
            {
                "text/plain" => Results.Content(response, type),
                "application/json" => Results.Ok(response),
                _ => Results.Content(response, type),
            };
        }

        private static string GetCallbackCaller(
            string appIdentifier, 
            string method, 
            string route, 
            string? serializedQuery = null, 
            string? serializedHeaders = null, 
            string? serializedBody = null)
        {
            var result = $"(http._apps['{appIdentifier}']";
            result += $".routes.filter(x => x.method === '{method}'";
            result += $" && x.route === '{route}')[0].callback)";
            
            switch(method)
            {
                case "GET":
                    result += $"('{serializedQuery}', '{serializedHeaders}')";
                    break;

                case "POST":
                    result += $"('{serializedBody}', '{serializedQuery}', '{serializedHeaders}')";
                    break;

                case "DELETE":
                    result += $"('{serializedBody}', '{serializedQuery}', '{serializedHeaders}')";
                    break;
            }

            return result;
        }

        private static void SetupRoutes(this WebApplication webApp, string name, List<HttpRoute> routes, Engine? engine)
        {
            foreach (var route in routes)
            {
                switch (route.Method)
                {
                    case "GET":
                        webApp.MapGet(route.Route!, (HttpRequest req) =>
                        {
                            var query = req.Query.ToDictionary(x => x.Key, x => string.Join("", x.Value));
                            var headers = req.Headers.ToDictionary(x => x.Key, x => string.Join("", x.Value));

                            var stringQuery = JsonSerializer.Serialize(query);
                            var stringHeaders = JsonSerializer.Serialize(headers);

                            var callbackCaller = GetCallbackCaller(name, "GET", route.Route!, stringQuery, stringHeaders);

                            var result = engine?.Evaluate(callbackCaller);

                            if(result is null)
                            {
                                return Results.StatusCode(500);
                            }
 
                            return result.IsString() ? Results.Ok(result.AsString()) : GetHttpResult(result);
                        });
                        break;

                    case "POST":
                        webApp.MapPost(route.Route ?? "/", (HttpRequest req) =>
                        {
                            StreamReader bodyReader = new(req.Body);
                            string body = bodyReader.ReadToEndAsync().Result;
                            var query = req.Query.ToDictionary(x => x.Key, x => string.Join("", x.Value));
                            var headers = req.Headers.ToDictionary(x => x.Key, x => string.Join("", x.Value));

                            var stringBody = JsonSerializer.Serialize(body).ReplaceFirst("\"{", "{").Replace("}\"", "}");
                            var stringQuery = JsonSerializer.Serialize(query);
                            var stringHeaders = JsonSerializer.Serialize(headers);

                            var callbackCaller = 
                                GetCallbackCaller(name, "POST", route.Route!, stringQuery, stringHeaders, stringBody);

                            var result = engine?.Evaluate(callbackCaller);

                            if (result is null)
                            {
                                return Results.StatusCode(500);
                            }

                            return result.IsString() ? Results.Ok(result.AsString()) : GetHttpResult(result);
                        });
                        break;

                    case "DELETE":
                        webApp.MapDelete(route.Route ?? "/", (HttpRequest req) =>
                        {
                            StreamReader bodyReader = new(req.Body);
                            string body = bodyReader.ReadToEndAsync().Result;
                            var query = req.Query.ToDictionary(x => x.Key, x => string.Join("", x.Value));
                            var headers = req.Headers.ToDictionary(x => x.Key, x => string.Join("", x.Value));

                            var stringBody = JsonSerializer.Serialize(body).ReplaceFirst("\"{", "{").Replace("}\"", "}");
                            var stringQuery = JsonSerializer.Serialize(query);
                            var stringHeaders = JsonSerializer.Serialize(headers);

                            var callbackCaller =
                                GetCallbackCaller(name, "DELETE", route.Route!, stringQuery, stringHeaders, stringBody);

                            var result = engine?.Evaluate(callbackCaller);

                            if (result is null)
                            {
                                return Results.StatusCode(500);
                            }

                            return result.IsString() ? Results.Ok(result.AsString()) : GetHttpResult(result);
                        });

                        break;
                }
            }
        }
    }
}