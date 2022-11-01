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

            using var promiseCallerIdentifier = new EngineOperation(engine)
                .WithBase("Melon")
                .WithProperty("http")
                .WithProperty("_apps")
                .WithProperty(identifier)
                .WithProperty("_promises")
                .WithProperty(promiseId);

            var promiseCaller = promiseCallerIdentifier.As<JsValue>();

            var promise = engine.Invoke(promiseCaller);

            await Task.Run(async () =>
            {
                bool finished = false;
                while (!finished)
                {
                    try
                    {
                        result = promise.UnwrapIfPromise();
                        promiseCallerIdentifier.Set("undefined");
                        finished = true;
                    }
                    catch (PromiseRejectedException)
                    {
                        throw;
                    }
                    catch (InvalidOperationException)
                    {
                        await Task.Delay(1);
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
