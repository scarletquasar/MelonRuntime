using Jint;
using Cli.NET.Tools;

namespace MelonJs.JavaScript.Extensions
{
    public static class EngineExtensions
    {
        public static void EnableConsoleLogging(this Engine engine)
        {
            engine.SetValue("melon_internal_console_log", new Action<string, int>(CLNConsole.WriteLine));
            
            engine.Execute(@"
                console = {
                    log: function(message) { melon_internal_console_log(message, 15) },
                    error: function(message) { melon_internal_console_log('[X] ' + message, 12) }
                };
            ");
        }

        public static void EnableFileSystem(this Engine engine)
        {
            engine.SetValue("melon.fs.read", new Func<string, string>(File.ReadAllText));
            engine.SetValue("melon.fs.write", new Action<string, string?>(File.WriteAllText));
        }
    }
}
