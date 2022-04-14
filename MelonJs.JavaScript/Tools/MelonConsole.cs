using Cli.NET.Tools;
using System.Text.Json;

namespace MelonJs.JavaScript.Tools
{
    public static class MelonConsole
    {
        public static void Write(object obj, int color)
        {
            CLNConsole.WriteLine(JsonSerializer.Serialize(obj), color);
        }
    }
}
