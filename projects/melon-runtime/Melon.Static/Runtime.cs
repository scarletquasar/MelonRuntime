using Cli.NET.Tools;
using Melon.Models.Dotnet;

namespace Melon.Static.Runtime
{
    public static class Runtime
    {
        public static Jint.Engine? Engine { get; set; }
        public static RealmGroup? Realms { get; set; } = new();
        public static CommandContainer? CommandContainer { get; set; }
    }
}
