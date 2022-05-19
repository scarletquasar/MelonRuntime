using Jint;
using MelonJs.Static.Tools.Scripting;
using MelonJs.Static.Tools.Output;
using MelonJs.Static.Tools.Web;
using MelonJs.JavaScript.Containers;
using MelonJs.Models.Web;
using MelonJs.WebApps;
using MelonJs.Static.Jint;
using MelonJs.Models.FileSystem;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        public static void SetupPolyfills(this Engine engine)
        {
            engine.Execute(BindingReader.Get("Polyfills/Number_isInteger"));
        }
        
        public static void SetupSystemMethods(this Engine engine)
        {
            engine.SetValue("melon_internal_xset", new Action<string, object>(XSetValue));

            static void XSetValue(string name, object value)
            {
                JintStatic.CurrentJintEngine?.SetValue(name, value);
            }

            engine.Execute(BindingReader.Get("Tools/ref"));
            engine.Execute(BindingReader.Get("Tools/load"));
            engine.Execute(BindingReader.Get("Tools/shift"));

            engine.SetValue("melon_internal_script_injector", new Action<string>(EngineWrapper.ExecuteDirectly));

            //Development note [for Vic or me (Malu)]: implement the new engine as a fresh copy of the old engine
            engine.SetValue("melon_internal_reset_current_execution", 
                new Action(() => _ = new JintContainer()));

            engine.SetValue("melon_internal_environment", typeof(MelonEnvironment));
            engine.SetValue("melon_internal_convert", typeof(MelonConvert));

            engine.Execute(BindingReader.Get("Tools/application"));
            engine.Execute(BindingReader.Get("Tools/environment"));
        }

        /// <summary>
        /// Setup the system variables for the current engine
        /// </summary>
        /// <param name="engine">Jint engine</param>
        public static void SetupSystemVariables(this Engine engine)
        {
            engine.SetValue("__basedir", Environment.CurrentDirectory);
            engine.SetValue("melon_internal_environment_variables", new Dictionary<string, string>());
            engine.SetValue("melon_internal_engine", engine);
        }

        /// <summary>
        /// Setup the debug methods for the current execution (engine and container)
        /// </summary>
        /// <param name="engine">Jint engine</param>
        /// <param name="container">JintContainer instance</param>
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
        /// <param name="engine">Jint engine</param>
        public static void EnableFileSystem(this Engine engine)
        {
            engine.SetValue("melon_internal_fs_read", new Func<string, string>(File.ReadAllText));
            engine.SetValue("melon_internal_fs_write", new Action<string, string?>(File.WriteAllText));
            engine.SetValue("melon_internal_save_file", new Action<string, byte[]>(File.WriteAllBytes));
            engine.SetValue("melon_internal_delete_file", new Action<string>(File.Delete));
            engine.SetValue("melon_internal_copy_file", new Action<string, string>(File.Copy));
            engine.SetValue("melon_internal_move_file", new Action<string, string>(File.Move));
            engine.SetValue("melon_internal_file", typeof(MelonFile));

            engine.SetValue("melon_internal_create_folder", new Func<string, DirectoryInfo>(Directory.CreateDirectory));

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
                new Action<string, int, string, string, bool>
                (WebApplicationManager.ExecuteWebApplication));

            engine.Execute(BindingReader.Get("Constructors/HttpRoute"));
            engine.Execute(BindingReader.Get("Constructors/HttpApplication"));
        }

        /// <summary>
        /// Enables the JavaScript polyfilled default constructors built-in with MelonJS.
        /// </summary>
        public static void EnableDefaultConstructors(this Engine engine)
        {
            engine.Execute(BindingReader.Get("Constructors/Errors/FileErrorConstants"));
            engine.Execute(BindingReader.Get("Constructors/FileSystem/File"));
            engine.Execute(BindingReader.Get("Constructors/FileSystem/Folder"));
            engine.Execute(BindingReader.Get("Constructors/Set"));
            engine.Execute(BindingReader.Get("Constructors/Map"));
            engine.Execute(BindingReader.Get("Constructors/Queue"));
            engine.Execute(BindingReader.Get("Constructors/Numbers/BigFloat"));
            engine.Execute(BindingReader.Get("Constructors/Numbers/NumberPeriod"));
        }
    }
}
