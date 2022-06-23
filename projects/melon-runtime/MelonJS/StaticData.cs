using System.Reflection;

namespace MelonJS
{
    public static class StaticData
    {
        public static string ApplicationInfo()
        {
            return $"MelonRuntime v{Assembly.GetExecutingAssembly().GetName().Version} [RC2]";
        }
    }
}
