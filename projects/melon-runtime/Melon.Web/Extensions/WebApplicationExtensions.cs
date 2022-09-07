using Jint;
using Jint.Native;
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
                async Task<object> operation(HttpRequest request)
                {
                    var query = request
                        .Query
                        .ToDictionary(x => x.Key, x => string.Join("", x.Value));

                    var headers = request
                        .Headers
                        .ToDictionary(x => x.Key, x => string.Join("", x.Value));

                    var stringQuery = JsonSerializer.Serialize(query);
                    var stringHeaders = JsonSerializer.Serialize(headers);
                    var stringBody = await new StreamReader(request.Body).ReadToEndAsync();

                    var callbackObjectReference = $@"
                        http
                        ._apps['{identifierName}']
                        .routes
                        .find(x => x.method === '{endpoint!.Method!}' 
                                && x.route === '{endpoint!.Route!}')
                        .callback
                    ";

                    JsValue? result = null;

                    var callbackCaller = CallbackCallerTools.GetCallbackCaller(
                        identifierName,
                        endpoint!.Method!,
                        endpoint!.Route!, 
                        stringQuery, 
                        stringHeaders);

                    var isAsyncMethod = engine
                        .Evaluate(callbackObjectReference)
                        .IsPromise();

                    var evaluation = engine!.Evaluate(callbackCaller);

                    if (isAsyncMethod)
                    {
                        var promiseFinished = false;

                        while(!promiseFinished)
                        {
                            await Task.Run(() =>
                            {
                                try
                                {
                                    result = evaluation.UnwrapIfPromise();
                                    promiseFinished = true;
                                }
                                finally { }
                            });
                        }
                    }
                    else
                    {
                        result = evaluation;
                    }

                    return getResult();

                    IResult getResult()
                    {
                        if (result is null)
                        {
                            return Results.StatusCode(500);
                        }

                        if (result.IsString())
                        {
                            return Results.Ok(result.AsString());
                        }

                        return HttpResultTools.GetHttpResult(result);
                    }
                }

                switch(endpoint.Method)
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
