using Cli.NET.Tools;

namespace Melon.Static.Runtime
{
    public static class Runtime
    {
        public static Jint.Engine? Engine { get; set; }
        public static Dictionary<string, Dictionary<string, dynamic>>? Realms { get; set; }
        public static CommandContainer? CommandContainer { get; set; }
    }
}