using Jint;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.Static;
using System.Text.Json;
using System.Text.Json.Serialization;

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

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var webApp = builder.Build();

            webApp.UseSwagger();
            webApp.UseSwaggerUI();

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

            webApp.Run($"http{httpsCondition}://{app.Host}:{app.Port}");
        }
    }
}