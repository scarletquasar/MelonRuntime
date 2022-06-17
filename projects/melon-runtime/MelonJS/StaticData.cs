using System.Reflection;

namespace MelonJS
{
    public static class StaticData
    {
        public static string ApplicationData() => $"MelonJS v{Assembly.GetExecutingAssembly().GetName().Version} [RC3]";
    }
}
