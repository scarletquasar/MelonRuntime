using Cli.NET.Tools;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MelonJs.Static.Tools.Output
{
    public static class MelonConsole
    {
        public static void Write(object obj, int color)
        {
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

            Console.WriteLine();
        }

        public static void WriteDetails(object obj)
        {
            CLNConsole.WriteLine(new string('-', 20), ConsoleColor.Cyan);

            JsonSerializerOptions options = new()
            {
                WriteIndented = true
            };

            object info = new 
            {
                type = new
                {
                    name = obj.GetType().FullName,
                    assemblyName = obj.GetType().Assembly.GetName().Name,
                    baseType = obj.GetType().BaseType?.FullName
                },
                sizeInBytes = GetObjectSize(obj),
                isSafe = obj.GetType().IsSecuritySafeCritical
            };

            CLNConsole.WriteLine(JsonSerializer.Serialize(info, options));
            CLNConsole.WriteLine(new string('-', 20), ConsoleColor.Cyan);
        }

        private static long GetObjectSize(object obj)
        {
            BinaryFormatter bf = new();
            MemoryStream ms = new();
            byte[] Array;
            bf.Serialize(ms, obj);
            Array = ms.ToArray();
            return Array.Length;
        }
    }
}