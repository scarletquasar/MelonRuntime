using Cli.NET.Tools;
using Jint;
using Jint.Native;
using MelonJs.Models.Extensions;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.Static.Jint;
using MelonJs.WebApps.Tools;
using System.Text.Json;

namespace MelonJs.WebApps {
    public static class WebApplicationManager
    {
        static int Main() => 0;
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
            {
                webApp.UseHttpsRedirection();
            }

            app.Echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.Host}:{x.Port}"));

            webApp.Urls.Add($"http{httpsCondition}://{app.Host}:{app.Port}");

            webApp.SetupRoutes(name, app.Routes, engine);

            Console.WriteLine();
            CLNConsole.Write("[Melon ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application with default: ", ConsoleColor.Green);
            CLNConsole.Write(webApp.Urls.ElementAt(0), ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();

            webApp.Run();
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

                            var callbackCaller = 
                                CallbackCallerTools.GetCallbackCaller(name, "GET", route.Route!, stringQuery, stringHeaders);

                            var result = engine?.Evaluate(callbackCaller);

                            if(result is null)
                            {
                                return Results.StatusCode(500);
                            }
 
                            return result.IsString() ? Results.Ok(result.AsString()) : HttpResultTools.GetHttpResult(result);
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
                                CallbackCallerTools.GetCallbackCaller
                                    (name, "POST", route.Route!, stringQuery, stringHeaders, stringBody);

                            var result = engine?.Evaluate(callbackCaller);

                            if (result is null)
                            {
                                return Results.StatusCode(500);
                            }

                            return result.IsString() ? Results.Ok(result.AsString()) : HttpResultTools.GetHttpResult(result);
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
                                CallbackCallerTools.GetCallbackCaller
                                    (name, "DELETE", route.Route!, stringQuery, stringHeaders, stringBody);

                            var result = engine?.Evaluate(callbackCaller);

                            if (result is null)
                            {
                                return Results.StatusCode(500);
                            }

                            return result.IsString() ? Results.Ok(result.AsString()) : HttpResultTools.GetHttpResult(result);
                        });

                        break;
                }
            }
        }
    }
}