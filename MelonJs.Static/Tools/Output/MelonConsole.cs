using Cli.NET.Tools;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MelonJs.Static.Tools.Output
{
    public static class MelonConsole
    {
        public static void Write(object obj, int color)
        {
            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            CLNConsole.Write("< ", ConsoleColor.Red);
            CLNConsole.Write(JsonSerializer.Serialize(obj, options), color);
            Console.WriteLine();
        }
    }
}
