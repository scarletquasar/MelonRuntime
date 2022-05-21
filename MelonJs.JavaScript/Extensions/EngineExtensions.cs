using Jint;
using MelonJs.Static.Tools.Scripting;
using MelonJs.Static.Tools.Output;
using MelonJs.Static.Tools.Web;
using MelonJs.JavaScript.Containers;
using MelonJs.Models.Web;
using MelonJs.WebApps;
using MelonJs.Models.FileSystem;
using MelonJs.Static;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        //Includes external libraries
        public static void SetupPolyfills(this Engine engine)
        {
            engine.Execute(BindingManager.Get("Libraries/esprima"));
        }
        
        public static void SetupSystemMethods(this Engine engine)
        {
            engine.SetValue("melon_internal_xset", new Action<string, object>(EngineWrapper.XSetValue));

            engine.Execute(BindingManager.Get("Tools/deep_clone"));
            engine.Execute(BindingManager.Get("Tools/reflect"));
            engine.Execute(BindingManager.Get("Tools/load"));
            engine.Execute(BindingManager.Get("Tools/shift"));

            engine.SetValue("melon_internal_script_injector", new Action<string>(EngineWrapper.ExecuteDirectly));

            //Development note [for Vic or me (Malu)]: implement the new engine as a fresh copy of the old engine
            engine.SetValue("melon_internal_reset_current_execution", 
                new Action(() => _ = new JintContainer()));

            engine.SetValue("melon_internal_environment", typeof(MelonEnvironment));
            engine.SetValue("melon_internal_convert", typeof(MelonConvert));

            engine.Execute(BindingManager.Get("Tools/application"));
            engine.Execute(BindingManager.Get("Tools/environment"));
        }

        /// <summary>
        /// Setup the system variables for the current engine
        /// </summary>
        /// <param name="engine">Jint engine</param>
        public static void SetupSystemVariables(this Engine engine)
        {
            engine.SetValue("__basedir", Environment.CurrentDirectory);
            engine.SetValue("melon_internal_cache", MelonCache.Dict);
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

            engine.Execute(BindingManager.Get("Tools/debug"));
        }

        /// <summary>
        /// Enables console logging (binding with abstract Console.Write related
        /// functions to show content in the screen).
        /// </summary>
        public static void EnableConsoleLogging(this Engine engine)
        {
            engine.SetValue("melon_internal_console_log", new Action<object, int>(MelonConsole.Write));
            engine.SetValue("melon_internal_console_clear", new Action(Console.Clear));
            engine.SetValue("melon_internal_conrole_readLine", new Func<string?>(Console.ReadLine));

            engine.Execute(BindingManager.Get("Tools/console"));
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
            engine.SetValue("melon_internal_folder", typeof(MelonFolder));

            engine.Execute(BindingManager.Get("Tools/fs"));
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

            engine.Execute(BindingManager.Get("Tools/http"));
            engine.Execute(BindingManager.Get("Constructors/Response"));
            engine.Execute(BindingManager.Get("Constructors/PingResponse"));

            engine.SetValue("melon_internal_http_application_run", 
                new Action<string, int, string, string, bool>
                (WebApplicationManager.ExecuteWebApplication));

            engine.Execute(BindingManager.Get("Constructors/HttpRoute"));
            engine.Execute(BindingManager.Get("Constructors/HttpApplication"));
        }

        /// <summary>
        /// Enables the JavaScript polyfilled default constructors built-in with MelonJS.
        /// </summary>
        public static void EnableDefaultConstructors(this Engine engine)
        {
            engine.Execute(BindingManager.Get("Constructors/Empty"));
            engine.Execute(BindingManager.Get("Constructors/Errors/FileErrorConstants"));
            engine.Execute(BindingManager.Get("Constructors/FileSystem/File"));
            engine.Execute(BindingManager.Get("Constructors/FileSystem/Folder"));
            engine.Execute(BindingManager.Get("Constructors/Set"));
            engine.Execute(BindingManager.Get("Constructors/Map"));
            engine.Execute(BindingManager.Get("Constructors/Queue"));
            engine.Execute(BindingManager.Get("Constructors/IndexedArray"));
            engine.Execute(BindingManager.Get("Constructors/Numbers/BigFloat"));
            engine.Execute(BindingManager.Get("Constructors/Numbers/NumberPeriod"));
        }
    }
}
