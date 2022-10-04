using Melon.Static.Runtime;
using Melon.Web.Extensions;
using Melon.Web.Models;
using System.Text.Json;

namespace Melon.Web
{
    public static class WebApplicationManager
    {
        static int Main() => 0;

        public static void ExecuteWebApplication(string serializedParameters)
        {
            var parameters = JsonSerializer.Deserialize<ExecuteWebApplicationParameters>(
                serializedParameters
            );
            var parsedEndpoints = JsonSerializer.Deserialize<List<HttpEndpoint>>(
                parameters!.Routes ?? "[]"
            );
            var parsedEchoes = JsonSerializer.Deserialize<List<HttpEcho>>(
                parameters!.Echoes ?? "[]"
            );

            var app = new HttpApplication(
                parameters.Name!,
                parameters.Host!,
                parameters.Port,
                parsedEndpoints!,
                parsedEchoes!,
                parameters.EnableHttps
            );

            var httpsCondition = app.EnableHttps ? "s" : string.Empty;

            var engine = Runtime.Engine;
            engine!.Execute($"Melon.http._apps['{app.Name}']._promises = {{}}");

            var builder = WebApplication.CreateBuilder(Array.Empty<string>());

            var webApp = builder.Build();

            if (app.EnableHttps)
            {
                webApp.UseHttpsRedirection();
            }

            app.Echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.Host}:{x.Port}"));

            webApp.Urls.Add($"http{httpsCondition}://{app.Host}:{app.Port}");
            webApp.SetupRoutes(parameters.Name!, app.Routes, engine!);

            Helpers.DisplayMelonAspnetInformation(webApp.Urls.ElementAt(0));

            webApp.Run();
        }
    }
}
