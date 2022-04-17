using Jint;
using MelonJs.JavaScript.Tools.Scripting;
using MelonJs.JavaScript.Tools.Output;
using MelonJs.JavaScript.Tools.Web;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        public static void SetupSystemVariables(this Engine engine)
        {
            engine.SetValue("__dirname", Environment.CurrentDirectory);
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
        /// Enables the JavaScript polyfilled default constructors built-in with MelonJS.
        /// </summary>
        public static void EnableDefaultConstructors(this Engine engine)
        {
            engine.Execute(BindingReader.Get("Constructors/Set"));
            engine.Execute(BindingReader.Get("Constructors/Map"));
        }
    }
}
