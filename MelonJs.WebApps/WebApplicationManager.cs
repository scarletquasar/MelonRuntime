using Cli.NET.Tools;
using Jint;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.Static.Jint;
using System.Text.Json;

static void Main(string[] args) { }

namespace MelonJs.WebApps {
    public static class WebApplicationManager
    {
        public static void ExecuteWebApplication(
            string host,
            int port,
            string routes,
            bool enableHttps = false)
        {
            var parsedRoutes = JsonSerializer.Deserialize<List<HttpRoute>>(routes);
            var app = new MelonHttpApplication(host, port, parsedRoutes ?? new(), enableHttps);
            var engine = JintStatic.CurrentJintEngine;

            var builder = WebApplication.CreateBuilder(Array.Empty<string>());

            var webApp = builder.Build();

            if (app.EnableHttps)
                webApp.UseHttpsRedirection();

            foreach (var route in app.Routes)
            {
                switch (route.Method)
                {
                    case "GET":
                        webApp.MapGet(route.Route ?? "/", () =>
                        {
                            var result = engine?.Evaluate($"({route.Callback})()");
                            return result.AsString();
                        });
                        break;
                }
            }

            var httpsCondition = app.EnableHttps ? "s" : string.Empty;
            var fullPath = $"http{httpsCondition}://{app.Host}:{app.Port}";

            Console.WriteLine();
            CLNConsole.Write("[MelonJS ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application in ", ConsoleColor.Green);
            CLNConsole.Write(fullPath, ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();

            webApp.Run(fullPath);
        }
    }
}