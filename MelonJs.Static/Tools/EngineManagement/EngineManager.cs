using Jint;
using MelonJs.Static.Jint;

namespace MelonJs.Static.Tools.EngineManagement
{
    public static class EngineManager
    {
        public static void ResetEngine(Engine? engine = null)
        {
            JintStatic.CurrentJintEngine = engine ?? new();
        }
    }
}
