using Jint.Native;
using Melon.Static.Runtime;

namespace Melon.Library.Static.InteropReflection
{
    public static class ThreadingManager
    {
        public static Thread CreateThread(JsValue action)
        {
            void ThreadAction()
            {
                Runtime.Engine!.Invoke(action);
            }

            var thread = new Thread(ThreadAction);

            return thread;
        }

        public static Task<JsValue> CreateTask(JsValue action)
        {
            return new(() => Runtime.Engine!.Invoke(action));
        }
    }
}
