using System.Reflection;

namespace MelonJS
{
    public static class StaticData
    {
        public static string ApplicationData() => $"MelonRuntime v{Assembly.GetExecutingAssembly().GetName().Version}";
    }
}
