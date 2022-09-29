using Jint;
using Melon.Web.Models;
using Melon.Web.Tools;
using System.Text.Json;

namespace Melon.Web.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplication SetupRoutes(
            this WebApplication webApp,
            string identifierName,
            List<HttpEndpoint> endpoints,
            Engine engine
        )
        {
            foreach (var endpoint in endpoints)
            {
                async Task<object> operation(HttpRequest request, HttpContext context)
                {
                    var query = request.Query.ToDictionary(
                        x => x.Key,
                        x => string.Join("", x.Value)
                    );

                    var headers = request.Headers.ToDictionary(
                        x => x.Key,
                        x => string.Join("", x.Value)
                    );

                    var stringQuery = JsonSerializer.Serialize(query);
                    var stringHeaders = JsonSerializer.Serialize(headers);
                    var stringBody = await new StreamReader(request.Body).ReadToEndAsync();

                    var callbackObjectReference =
                        $@"
                        Melon
                        .http
                        ._apps['{identifierName}']
                        .getEndpoints()
                        .find(x => x.method === '{endpoint!.Method!}' 
                                && x.route === '{endpoint!.Route!}')
                        .callback
                    ";

                    var callbackCaller = await CallbackCallerTools.GetCallbackCaller(
                        identifierName,
                        endpoint!.Method!,
                        endpoint!.Route!,
                        stringQuery,
                        stringHeaders
                    );

                    var evaluation = engine!.Evaluate(callbackCaller);

                    if (evaluation.IsNumber())
                    {
                        var promiseResult = await ResultManager.ExecutePromise(
                            engine,
                            identifierName,
                            (uint)evaluation.AsNumber()
                        );

                        var promiseResultHeaders = HttpResultTools.GetHttpHeaders(promiseResult);
                        foreach (var header in promiseResultHeaders)
                        {
                            context.Response.Headers.Add(header.Key, header.Value.ToString());
                        }

                        return ResultManager.GetHttpResult(promiseResult);
                    }

                    var syncResultHeaders = HttpResultTools.GetHttpHeaders(evaluation);
                    foreach (var header in syncResultHeaders)
                    {
                        context.Response.Headers.Add(header.Key, header.Value);
                    }

                    return ResultManager.GetHttpResult(evaluation);
                }

                switch (endpoint.Method)
                {
                    case "GET":
                        webApp.MapGet(endpoint.Route!, operation);
                        break;

                    case "POST":
                        webApp.MapPost(endpoint.Route!, operation);
                        break;

                    case "DELETE":
                        webApp.MapDelete(endpoint.Route!, operation);
                        break;
                }
            }

            return webApp;
        }
    }
}
