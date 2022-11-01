using Jint.Native;
using Melon.Static.Runtime;

namespace Melon.Library.Static.InteropReflection
{
    public static class ThreadingManager
    {
        public static Thread CreateThread(JsValue action)
        {
            return new Thread(() => Runtime.Engine!.Invoke(action));
        }

        public static Task<JsValue> CreateTask(JsValue action)
        {
            return new(() => Runtime.Engine!.Invoke(action));
        }
    }
}
