using Jint;
using Jint.Native;
using Jint.Runtime;
using Melon.Models.Engine;

namespace Melon.Web.Tools
{
    public static class ResultManager
    {
        public static async Task<JsValue> ExecutePromise(
            Engine engine,
            string identifier,
            string promiseId
        )
        {
            JsValue? result = null;

            var promiseCallerIdentifier = $"Melon.http._apps['{identifier}']._promises['{promiseId}']";
            var promise = engine.Evaluate(promiseCallerIdentifier + "()");

            await Task.Run(() =>
            {
                bool finished = false;
                while (!finished)
                {
                    try
                    {
                        result = promise.UnwrapIfPromise();
                        engine.Evaluate(promiseCallerIdentifier + " = undefined");
                        finished = true;
                    }
                    catch (PromiseRejectedException)
                    {
                        throw;
                    }
                    catch (InvalidOperationException)
                    {
                        Thread.Sleep(1);
                    }
                }
            });

            return result!;
        }

        public static object GetHttpResult(JsValue result)
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
