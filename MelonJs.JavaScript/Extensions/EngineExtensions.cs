using Jint;
using MelonJs.JavaScript.Tools;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        /// <summary>
        /// Enables console logging (binding with abstract Console.Write related
        /// functions to show content in the screen).
        /// </summary>
        public static void EnableConsoleLogging(this Engine engine)
        {
            engine.SetValue("melon_internal_console_log", new Action<object, int>(MelonConsole.Write));
            
            engine.Execute(@"
                const console = {
                    log: function(message) { melon_internal_console_log(message, 15) },
                    error: function(message) { melon_internal_console_log('[X] ' + message, 12) },
                    warn: function(message) { melon_internal_console_log('[!] ' + message, 14) }
                };
            ");
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

            engine.Execute(@"
                const fs = {
                    read: function(path) { melon_internal_fs_read(path) },
                    write: function(path, content) { melon_internal_fs_write(path, content) }
                };
            ");
        }
    }
}
