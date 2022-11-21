using Cli.NET.Tools;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.WebServices.Entities;
using Newtonsoft.Json;

namespace MelonRuntime.WebServices.Entities
{
    public class WebServiceApplication : IWebServiceApplication<IMelon<JsValue>>
    {
        private readonly List<WebServiceApplicationEcho> _echoes;
        private readonly List<WebServiceApplicationEndpoint> _endpoints;
        private readonly string _host;
        private readonly int _port;
        private readonly bool _isHttpsEnabled;

        public WebServiceApplication(
            List<WebServiceApplicationEndpoint> endpoints,
            List<WebServiceApplicationEcho> echoes,
            string host,
            string name,
            int port,
            bool isHttpsEnabled,
            IMelon<JsValue> melon)
        {
            _endpoints = endpoints;
            _echoes = echoes;
            _host = host;
            _port = port;
            _isHttpsEnabled = isHttpsEnabled;

            melon.SendInstructions($"Melon.http._apps['{name}']._promises = {{}}");
        }

        public void AddEchoes(IWebServiceApplicationEcho[] echoes)
        {
            _echoes.AddRange((IEnumerable<WebServiceApplicationEcho>)echoes);
        }

        public void AddEndpoints(IWebServiceApplicationEndpoint<IMelon<JsValue>>[] endpoints)
        {
            _endpoints.AddRange((IEnumerable<WebServiceApplicationEndpoint>)endpoints);
        }

        public string GetHost()
        {
            return _host;
        }

        public int GetPort()
        {
            return _port;
        }

        public bool IsHttpsEnabled()
        {
            return _isHttpsEnabled;
        }

        public void Run()
        {
            var builder = WebApplication.CreateBuilder(Array.Empty<string>());
            var webApp = builder.Build();

            if (_isHttpsEnabled)
            {
                webApp.UseHttpsRedirection();
            }

            var httpsCondition = _isHttpsEnabled ? "s" : string.Empty;

            _echoes.ForEach(x => webApp.Urls.Add($"http{httpsCondition}://{x.GetHost()}:{x.GetPort()}"));
            webApp.Urls.Add($"http{httpsCondition}://{_host}:{_port}");

            _endpoints.ForEach(endpoint =>
            {
                webApp.MapMethods(
                    endpoint.GetPath(), 
                    new List<string>() { endpoint.GetMethod().ToString() }, 
                    endpoint.Resolve);
            });

            Console.WriteLine();
            CLNConsole.Write("[Melon ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application with default: ", ConsoleColor.Green);
            CLNConsole.Write(webApp.Urls.ElementAt(0), ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();

            webApp.Run();
        }
    }
}
