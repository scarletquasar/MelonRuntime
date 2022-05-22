using Cli.NET.Tools;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MelonJs.Static.Tools.Output
{
    public static class MelonConsole
    {
        public static void Write(object obj, int color)
        {
            CLNConsole.Write("< ", ConsoleColor.Red);

            try
            {
                JsonSerializerOptions options = new()
                {
                    ReferenceHandler = ReferenceHandler.IgnoreCycles,
                    WriteIndented = true
                };

                var serialized = JsonSerializer.Serialize(obj, options);
                CLNConsole.Write(serialized, color);
            }
            catch (Exception)
            {
                CLNConsole.Write(obj.ToString() ?? "null", color);
            }

            Console.WriteLine();
        }
    }
}
