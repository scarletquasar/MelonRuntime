using Melon.Library.Static.Database;
using Melon.Library.Static.Web;
using Melon.Web;
using Melon.Library.Static.Generic;
using Melon.Library.Static.InteropReflection;
using Melon.Models.Library;
using Microsoft.VisualBasic.FileIO;
using Jint.Native;
using System.Text.Json.Nodes;
using DotnetFetch.Models;
using System.Dynamic;
using System.Text;

namespace Melon.Library.Static
{
    public static class InternalBinding
    {
        public static Dictionary<string, dynamic> LocalEnvironmentVariables { get; } = new();
        public static Dictionary<string, dynamic> Dictionary { get; } =
            new()
            {
                { 
                    "StringifyFunction", 
                    new Func<Func<JsValue, JsValue[], JsValue>, string>(Functions.StringifyFunction) 
                },
                { "DeepClone", new Func<object, object>(Generic.Object.Clone) },
                { "LocalEnvironmentVariables", LocalEnvironmentVariables },
                { "ProcessExit", new Action<int>(Environment.Exit) },
                { "ReadFileText", new Func<string, string>(File.ReadAllText) },
                { 
                    "ReadFileTextAsync", 
                    new Func<string, CancellationToken, Task<string>>(File.ReadAllTextAsync) 
                },
                { "WriteFileText", new Action<string, string?>(File.WriteAllText) },
                { 
                    "WriteFileTextAsync",
                    new Func<string, string?, CancellationToken, Task>(File.WriteAllTextAsync)
                },
                { "ReadFileBytes", new Func<string, byte[]>(File.ReadAllBytes) },
                {
                    "ReadFileBytesAsync",
                    new Func<string, CancellationToken, Task<byte[]>>(File.ReadAllBytesAsync)
                },
                { "WriteFileBytes", new Action<string, byte[]>(File.WriteAllBytes) },
                { 
                    "WriteFileBytesAsync", 
                    new Func<string, byte[], CancellationToken, Task>(File.WriteAllBytesAsync) 
                },
                { "DeleteFile", new Action<string>(File.Delete) },
                { "CopyFile", new Action<string, string, bool>(File.Copy) },
                { "MoveFile", new Action<string, string, bool>(File.Move) },
                { "RenameFile", new Action<string, string>(FileSystem.RenameFile) },
                { "RenameDirectory", new Action<string, string>(FileSystem.RenameDirectory) },
                { "CreateDirectory", new Func<string, DirectoryInfo>(Directory.CreateDirectory) },
                { "DeleteDirectory", new Action<string, bool>(Directory.Delete) },
                {
                    "PostgreSQLBindingQuery",
                    new Func<string, dynamic, dynamic>(PgStatic.ExecuteQuery)
                },
                {
                    "PostgreSQLBindingNonQuery",
                    new Func<string, dynamic, int>(PgStatic.ExecuteNonQuery)
                },
                {
                    "MySqlBindingQuery",
                    new Func<string, dynamic, dynamic>(MySqlStatic.ExecuteQuery)
                },
                {
                    "MySqlBindingNonQuery",
                    new Func<string, dynamic, int>(MySqlStatic.ExecuteNonQuery)
                },
                {
                    "SqlServerBindingQuery",
                    new Func<string, dynamic, dynamic>(SqlServerStatic.ExecuteQuery)
                },
                {
                    "SqlServerBindingNonQuery",
                    new Func<string, dynamic, int>(SqlServerStatic.ExecuteNonQuery)
                },
                {
                    "SetupWebApplication",
                    new Action<string>(WebApplicationManager.ExecuteWebApplication)
                },
                {
                    "HttpRequest",
                    new Func<string, string, string, string, HttpResponse>(Http.Request)
                },
                {
                    "Fetch",
                    new Func<string, ExpandoObject?, Task<Response>>(Http.Fetch)
                },
                {
                    "CallStaticMethod",
                    new Func<string, string, string, object[], dynamic?>(
                        ReflectionHelper.CallMethod
                    )
                },
                {
                    "GetStaticProperty",
                    new Func<string, string, string, dynamic?>(ReflectionHelper.GetStaticProperty)
                },
                { "LoadAssembly", new Func<string, string?>(ReflectionHelper.LoadAssembly) },
                { "RemoveAssembly", new Action<string>(ReflectionHelper.RemoveAssembly) },
                {
                    "GetLoadedAssemblies",
                    new Func<string?[]>(ReflectionHelper.GetLoadedAssemblies)
                },
                { "CreateRealm", new Action<string>(RealmManager.CreateRealm) },
                {
                    "SetRealmScriptProperty",
                    new Action<string, string, dynamic>(RealmManager.SetRealmPropertyFromScript)
                },
                {
                    "SetRealmInstanceProperty",
                    new Action<string, string, string, string, object[]>(
                        RealmManager.SetRealmPropertyFromInstance
                    )
                },
                {
                    "GetRealmProperty",
                    new Func<string, string, dynamic?>(RealmManager.GetRealmProperty)
                },
                { "CreateThread", new Func<JsValue, Thread>(ThreadingManager.CreateThread) },
                { "CreateTask", new Func<JsValue, Task<object>>(ThreadingManager.CreateTask) }
            };
    }
}
