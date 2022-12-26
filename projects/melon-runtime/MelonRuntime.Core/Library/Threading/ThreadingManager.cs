using Jint.Native;
using MelonRuntime.Abstractions.Generic;

namespace MelonRuntime.Core.Library.Threading
{
    public static class ThreadingManager
    {
        public static Thread CreateThread(string identifier, IMelon<JsValue> melon) 
        {
            var thread = new Thread(() => {
                var threads = "Melon.dotnet.threading.Thread.threads";
                var function = melon.EvaluateInstructions($"{threads}['{identifier}'].interopAction");

                melon.InteropInvoke(function);
            });

            thread.Name = identifier;


            return thread;
        }

        public static Task<JsValue> CreateTask(JsValue action, IMelon<JsValue> melon)
        {
            return new(() => melon.InteropInvoke(action));
        }
    }
}
