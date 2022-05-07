using Jint;
using MelonJs.JavaScript.Tools.Scripting;
using MelonJs.JavaScript.Tools.Output;
using MelonJs.JavaScript.Tools.Web;
using MelonJs.JavaScript.Containers;
using MelonJs.Models.Web;
using MelonJs.Models.Web.HttpApplication;
using MelonJs.WebApps;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        public static void SetupSystemVariables(this Engine engine)
        {
            engine.SetValue("__dirname", Environment.CurrentDirectory);
            engine.SetValue("melon_internal_engine", engine);
        }

        public static void SetupDebugMethods(this Engine engine, JintContainer container)
        {
            engine.SetValue("melon_internal_debug_set_stack_tracing", 
                new Action<bool>((bool status) => container.EnableStackTracing = status));

            engine.Execute(BindingReader.Get("Tools/debug"));
        }

        /// <summary>
        /// Enables console logging (binding with abstract Console.Write related
        /// functions to show content in the screen).
        /// </summary>
        public static void EnableConsoleLogging(this Engine engine)
        {
            engine.SetValue("melon_internal_console_log", new Action<object, int>(MelonConsole.Write));
            engine.SetValue("melon_internal_console_clear", new Action(Console.Clear));

            engine.Execute(BindingReader.Get("Tools/console"));
        }

        /// <summary>
        /// Enables the "fs" module and file system management (binding with File related
        /// functions to deal with files). 
        /// </summary>
        /// <param name="engine"></param>
        public static void EnableFileSystem(this Engine engine)
        {
            engine.SetValue("melon_internal_fs_read", new Func<string, string>(File.ReadAllText));
            engine.SetValue("melon_internal_fs_write", new Action<string, string?>(File.WriteAllText));

            engine.Execute(BindingReader.Get("Tools/fs"));
        }

        /// <summary>
        /// Enables Http operations and related constructors built-in with MelonJS.
        /// </summary>
        public static void EnableHttpOperations(this Engine engine)
        {
            engine.SetValue("melon_internal_fetch_request",
                new Func<string, string, string, string, MelonHttpResponse>(MelonHttp.Request));

            engine.SetValue("melon_internal_ping_request", 
                new Func<string, uint, MelonPingReply>(MelonHttp.Ping));

            engine.Execute(BindingReader.Get("Tools/http"));
            engine.Execute(BindingReader.Get("Constructors/Response"));
            engine.Execute(BindingReader.Get("Constructors/PingResponse"));

            engine.SetValue("melon_internal_http_application_run", 
                new Action<Engine, string, uint, HttpRoute[], bool>
                (WebApplicationManager.ExecuteWebApplication));

            engine.Execute(BindingReader.Get("Constructors/HttpRoute"));
            engine.Execute(BindingReader.Get("Constructors/HttpApplication"));
        }

        /// <summary>
        /// Enables the JavaScript polyfilled default constructors built-in with MelonJS.
        /// </summary>
        public static void EnableDefaultConstructors(this Engine engine)
        {
            engine.Execute(BindingReader.Get("Constructors/Set"));
            engine.Execute(BindingReader.Get("Constructors/Map"));
        }
    }
}
