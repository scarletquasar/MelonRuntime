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
                    if(endpoint.Method!.ToLower() != request.Method.ToLower())
                        return Results.StatusCode(StatusCodes.Status405MethodNotAllowed);

                    var query = request.Query.ToDictionary(
                        x => x.Key,
                        x => string.Join("", x.Value)
                    );

                    var headers = request.Headers.ToDictionary(
                        x => x.Key,
                        x => string.Join("", x.Value)
                    );

                    var routeValues = request.RouteValues.ToDictionary(
                        x => x.Key,
                        x => string.Join("", x.Value)
                    );

                    var stringQuery = JsonSerializer.Serialize(query);
                    var stringHeaders = JsonSerializer.Serialize(headers);
                    var stringBody = await new StreamReader(request.Body).ReadToEndAsync();
                    var stringRouteValues = JsonSerializer.Serialize(routeValues);

                    var callbackCaller = await CallbackCallerTools.GetCallbackCaller(
                        identifierName,
                        endpoint!.Method!,
                        endpoint!.Route!,
                        stringQuery,
                        stringHeaders,
                        stringBody,
                        stringRouteValues
                    );

                    var evaluation = engine!.Evaluate(callbackCaller);

                    if (evaluation.IsString() && evaluation.AsString().StartsWith("pending_melon_http_promise_"))
                    {
                        var promiseResult = await ResultManager.ExecutePromise(
                            engine,
                            identifierName,
                            evaluation.AsString()
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

                webApp.MapMethods(endpoint.Route!, new List<string>(){ endpoint.Method! }, operation);
            }

            return webApp;
        }
    }
}
