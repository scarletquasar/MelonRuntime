using Cli.NET.Tools;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Melon.Library.Static.InputOutput
{
    public static class Console
    {
        public static void Log(object obj, int color = 0)
        {
            System.Console.WriteLine();

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
            catch
            {
                CLNConsole.Write(obj.GetType().ToString(), color);
            }
        }
    }
}
