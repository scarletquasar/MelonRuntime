using Jint;
using Jint.Native;
using Jint.Runtime;

namespace Melon.Web.Tools
{
    public static class ResultManager
    {
        public static async Task<JsValue> ExecutePromise(
            Engine engine, 
            string identifier, 
            uint promiseId
        )
        {
            JsValue? result = null;

            var promiseCallerIdentifier = $@"
                Melon
                    .http
                    ._apps['{identifier}']
                    ._promises[{promiseId}]
            ";

            var promiseCaller = engine.Evaluate(promiseCallerIdentifier);
            var promise = engine.Invoke(promiseCaller);

            await Task.Run(async () =>
            {
                bool finished = false;
                while (!finished)
                {
                    try
                    {
                        result = promise.UnwrapIfPromise();
                        finished = true;
                    }
                    catch (PromiseRejectedException)
                    {
                        throw;
                    }
                    catch (InvalidOperationException)
                    {
                        await Task.Delay(100);
                    }
                }
            });

            return result!;
        }
        public static IResult GetHttpResult(JsValue result)
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
}
