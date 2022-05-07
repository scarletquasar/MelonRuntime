using Jint;
using MelonJs.Models.Web.HttpApplication;

static void Main(string[] args) { }

namespace MelonJs.WebApps {
    public static class WebApplicationManager
    {
        public static void ExecuteWebApplication(
            Engine engine,
            string host,
            uint port,
            HttpRoute[] routes,
            bool enableHttps = true)
        {
            var app = new MelonHttpApplication(host, port, routes.ToList(), enableHttps);

            var builder = WebApplication.CreateBuilder(Array.Empty<string>());
            var webApp = builder.Build();

            if (app.EnableHttps)
                webApp.UseHttpsRedirection();

            foreach (var route in app.Routes)
            {
                switch (route.Method)
                {
                    case "GET":
                        webApp.MapGet(route.Path, () =>
                        {
                            var result = engine.Evaluate(route.Callback);
                            return result.AsString();
                        });

                        break;

                    case "POST":
                        webApp.MapPost(route.Path, (object args) =>
                        {
                            var result = engine.Evaluate(route.Callback);
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