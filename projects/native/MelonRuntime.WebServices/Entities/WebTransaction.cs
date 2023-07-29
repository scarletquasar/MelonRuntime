using Jint;
using Jint.Native;
using Jint.Runtime;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.WebServices.Entities;
using MelonRuntime.Abstractions.WebServices.Enums;

namespace MelonRuntime.WebServices.Entities
{
    public class WebTransaction : IWebTransaction
    {
        private WebTransactionStatus _status;
        private readonly string _callerScript;
        private readonly IMelon<JsValue> _melon;

        public WebTransaction(string callerScript, IMelon<JsValue> melon)
        {
            _callerScript = callerScript;
            _melon = melon;

            _status = WebTransactionStatus.NotStarted;
        }

        public void SetStatus(WebTransactionStatus status)
        {
            _status = status;
        }

        public object? ExecuteAndUnwrap()
        {
            JsValue? result = null;
            bool finished = false;

            var promiseOrResult = _melon.EvaluateInstructions(_callerScript + "()");
            SetStatus(WebTransactionStatus.Running);

            while (!finished)
            {
                try
                {
                    result = promiseOrResult.UnwrapIfPromise();
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

            SetStatus(WebTransactionStatus.Finished);

            return result;
        }

        public WebTransactionStatus GetCurrentStatus()
        {
            return _status;
        }
    }
}
