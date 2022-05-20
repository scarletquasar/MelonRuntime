using MelonJs.Static.Jint;

namespace MelonJs.Static.Tools.Scripting
{
    public static class EngineWrapper
    {
        public static void ExecuteDirectly(string script)
        {
            JintStatic.CurrentJintEngine?.Execute(script);
        }

        public static void XSetValue(string name, object value)
        {
            JintStatic.CurrentJintEngine?.SetValue(name, value);
        }
    }
}
