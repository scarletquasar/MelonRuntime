using Jint.Native;
using MelonRuntime.Abstractions.Generic;

namespace MelonRuntime.Core.Library.Threading
{
    public static class ThreadingManager
    {
        public static Thread CreateThread(JsValue action, IMelon<JsValue> melon)
        {
            return new(() => melon.InteropInvoke(action));
        }

        public static Task<JsValue> CreateTask(JsValue action, IMelon<JsValue> melon)
        {
            return new(() => melon.InteropInvoke(action));
        }
    }
}
