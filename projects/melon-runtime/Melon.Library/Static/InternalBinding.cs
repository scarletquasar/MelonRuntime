using Melon.Library.Static.Database;
using Melon.Library.Static.OS;
using Melon.Web;

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
            { "ProcessExit", new Action<int>(Environment.Exit) },
            { "LocalEnvironmentVariables", LocalEnvironmentVariables! },
            { "ProcessEnvironmentVariables", Environment.GetEnvironmentVariables() },

            //Module - [InputOutput]
            { "ConsoleLog", new Action<object, int>(InputOutput.Console.Log) },
            { "ConsoleClear", new Action(Console.Clear) },

            //Module - [FileSystem]
            { "ReadFileTextSync", new Func<string, string>(File.ReadAllText) },
            { "WriteFileTextSync", new Action<string, string?>(File.WriteAllText) },

            //Module - [Database]
            { "PostgreSQLBindingQuery", new Func<string, string, dynamic>(PgStatic.ExecuteQuery) },
            { "PostgreSQLBindingNonQuery", new Func<string, string, int>(PgStatic.ExecuteNonQuery) },
            { "MySqlBindingQuery", new Func<string, string, dynamic>(MySqlStatic.ExecuteQuery) },
            { "MySqlBindingNonQuery", new Func<string, string, int>(MySqlStatic.ExecuteNonQuery) },
            { "SqlServerBindingQuery", new Func<string, string, dynamic>(SqlServerStatic.ExecuteQuery) },
            { "SqlServerBindingNonQuery", new Func<string, string, int>(SqlServerStatic.ExecuteNonQuery) },

            //Module - [Http]
            { "SetupWebApplication", 
                new Action<string, string, int, string, string, bool>(WebApplicationManager.ExecuteWebApplication) }
        };
        
    }
}
