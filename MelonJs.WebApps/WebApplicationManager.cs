using Cli.NET.Tools;
using Jint;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.Static.Jint;
using System.Linq;
using System.Text.Json;

static void Main(string[] args) { }

namespace MelonJs.WebApps {
    public static class WebApplicationManager
    {
        public static void ExecuteWebApplication(
            string host,
            int port,
            string routes,
            string echoes,
            bool enableHttps = false)
        {
            var parsedRoutes = JsonSerializer.Deserialize<List<HttpRoute>>(routes);
            var parsedEchoes = JsonSerializer.Deserialize<List<HttpEcho>>(echoes);

            var app = new MelonHttpApplication(host, port, parsedRoutes ?? new(), parsedEchoes ?? new(), enableHttps);
            var httpsCondition = app.EnableHttps ? "s" : string.Empty;

            var engine = JintStatic.CurrentJintEngine;
            var builder = WebApplication.CreateBuilder(Array.Empty<string>());

            var webApp = builder.Build();

            if (app.EnableHttps)
                webApp.UseHttpsRedirection();

            webApp.Urls.Add($"http{httpsCondition}://{app.Host}:{app.Port}");

            if (app.Echoes.Any())
                app.Echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.Host}:{x.Port}"));

            foreach (var route in app.Routes)
            {
                switch (route.Method)
                {
                    case "GET":
                        webApp.MapGet(route.Route ?? "/", (HttpRequest req) =>
                        {
                            Dictionary<string, string> query = 
                                req.Query.ToDictionary(x => x.Key, x => string.Join("", x.Value));

                            var serializedQuery = JsonSerializer.Serialize(query);

                            var result = engine?.Evaluate($"({route.Callback})('{serializedQuery}')");
                            return result.AsString();
                        });
                        break;
                }
            }

            Console.WriteLine();
            CLNConsole.Write("[MelonJS ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application with default: ", ConsoleColor.Green);
            CLNConsole.Write(webApp.Urls.ElementAt(0), ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();

            webApp.Run();
        }
    }
}