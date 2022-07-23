using Jint;
using Melon.Static.Runtime;
using Melon.Web.Models;
using Melon.Web.Tools;
using System.Text.Json;

namespace Melon.Web
{
    public static class WebApplicationManager
    {
        static int Main() => 0;
        public static void ExecuteWebApplication(string serializedParameters)
        {
            var parameters = JsonSerializer.Deserialize<ExecuteWebApplicationParameters>(serializedParameters);
            var parsedRoutes = JsonSerializer.Deserialize<List<HttpRoute>>(parameters!.Routes ?? "[]");
            var parsedEchoes = JsonSerializer.Deserialize<List<HttpEcho>>(parameters!.Echoes ?? "[]");

            var app = new HttpApplication(
                parameters.Name!, 
                parameters.Host!, 
                parameters.Port, 
                parsedRoutes!, 
                parsedEchoes!, parameters.EnableHttps);

            var httpsCondition = app.EnableHttps ? "s" : string.Empty;

            var engine = Runtime.Engine;
            var builder = WebApplication.CreateBuilder(Array.Empty<string>());

            var webApp = builder.Build();

            if (app.EnableHttps)
            {
                webApp.UseHttpsRedirection();
            }

            app.Echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.Host}:{x.Port}"));

            webApp.Urls.Add($"http{httpsCondition}://{app.Host}:{app.Port}");
            webApp.SetupRoutes(parameters.Name!, app.Routes, engine);

            Helpers.DisplayMelonAspnetInformation(webApp.Urls.ElementAt(0));

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

                            if (result is null)
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

                            var stringBody = JsonSerializer.Serialize(body).Replace("\"{", "{").Replace("}\"", "}");
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

                            var stringBody = JsonSerializer.Serialize(body).Replace("\"{", "{").Replace("}\"", "}");
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