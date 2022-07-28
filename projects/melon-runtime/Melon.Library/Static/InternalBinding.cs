using Melon.Library.Models;
using Melon.Library.Static.Database;
using Melon.Library.Static.OS;
using Melon.Library.Static.Web;
using Melon.Web;
using Melon.Library.Static.Generic;
using Melon.Library.Static.InteropReflection;

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
            { "SetTimeout", new Action<int, int>(Time.SetTimeout) },
            { "SetInterval", new Action<int, int>(Time.SetInterval) },

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
            { 
                "SetupWebApplication", 
                new Action<string>(WebApplicationManager.ExecuteWebApplication) 
            },
            { 
                "FetchRequest",
                new Func<string, string, string, string, HttpResponse>(Http.Request) 
            },

            //Module - [Interop]
            {
                "InteropInternalCallStaticMethod",
                new Func<string, string, string, int, object[], dynamic?>(ReflectionHelper.CallMethod) },
            {
                "InteropInternalGetStaticProperty",
                new Func<string, string, string, dynamic?>(ReflectionHelper.GetStaticProperty)
            }
        };
    }
}
