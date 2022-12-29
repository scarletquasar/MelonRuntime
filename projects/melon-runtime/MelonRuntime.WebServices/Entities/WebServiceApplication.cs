using Cli.NET.Tools;
using Jint;
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
                async Task<object?> resolveAndGetMetadata(HttpRequest request, HttpContext context)
                {
                    var result = (JsValue?)await endpoint.Resolve(request);

                    if (result == null)
                    {
                        return null;
                    }

                    if (result.IsString())
                    {
                        return result.AsString();
                    }

                    if (result.IsNumber())
                    {
                        return result.AsNumber();
                    }

                    if (result.IsBoolean())
                    {
                        return result.AsBoolean();
                    }

                    if (result.IsBigInt())
                    {
                        return result.AsBigInt64Array();
                    }

                    if (result.IsObject() || result.IsArray())
                    {
                        Dictionary<string, dynamic> httpHeaders = new();

                        if (result != null)
                        {
                            var headersString = result.Get("headers") == JsValue.Undefined 
                                ? "{}" 
                                : result.Get("headers").AsString();

                            httpHeaders = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(
                                headersString
                            )!;
                        }

                        foreach (var header in httpHeaders)
                        {
                            context.Response.Headers[header.Key] = header.Value.ToString();
                        }

                        var httpResult = result!.AsObject();

                        var headers = JsonConvert.DeserializeObject<Dictionary<string, object>>(
                            httpResult.Get("headers").AsString()
                        );

                        var response = httpResult.Get("response").AsString();
                        var status = httpResult.Get("status").AsNumber();

                        var type = Convert.ToString(headers!["Content-Type"])!;
                        context.Response.ContentType = type;

                        if(type.ToLower().StartsWith("text"))
                        {
                            return Results.Content(response);
                        }

                        return Results.Json(
                            System.Text.Json.JsonSerializer.Deserialize<object>(response), statusCode: (int)status
                        );
                    }

                    return $"[object {result.Type}]";
                }

                webApp.MapMethods(
                    endpoint.GetPath(), 
                    new List<string>() { endpoint.GetMethod().ToString() },
                    resolveAndGetMetadata);
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
