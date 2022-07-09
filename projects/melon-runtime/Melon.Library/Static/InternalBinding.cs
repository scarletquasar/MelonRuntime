using Melon.Library.Static.OS;

namespace Melon.Library.Static
{
    public static class InternalBinding
    {
        public static Dictionary<string, dynamic> LocalEnvironmentVariables = new() { };
        public static Dictionary<string, dynamic> Dictionary = new()
        {
            //Module - [Standard]
            { "CurrentDirectory", new Func<string>(() => Environment.CurrentDirectory) },
            { "BaseDirectory", new Func<string?>(() => Dictionary?["CurrentDirectory"]()) },
            { "OsInformation", new Func<dynamic>(() => OSBinding.GetOSInformation()) },
            { "ArgumentsVector", Environment.GetCommandLineArgs() },
            { "ProcessExit", new Action<int>(Environment.Exit)},
            { "LocalEnvironmentVariables", LocalEnvironmentVariables! },
            { "ProcessEnvironmentVariables", Environment.GetEnvironmentVariables() },

            //Module - [InputOutput]
            { "ConsoleLog", new Action<object, int>(InputOutput.Console.Log) },

            //Module - [FileSystem]
            { "ReadFileTextSync", new Func<string, string>(File.ReadAllText) },
            { "WriteFileTextSync", new Action<string, string?>(File.WriteAllText) }
        };
        
    }
}
