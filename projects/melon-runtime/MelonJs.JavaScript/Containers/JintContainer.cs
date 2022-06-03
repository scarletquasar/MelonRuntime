using Cli.NET.Tools;
using Esprima;
using Jint;
using Jint.Runtime;
using MelonJs.JavaScript.Extensions;
using MelonJs.Models.Project;
using MelonJs.Static.Jint;
using MelonJs.Static.Tools.Scripting;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MelonJs.JavaScript.Containers
{
    public class JintContainer
    {
        private App _currentApp;
        public bool EnableStackTracing;

        /// <summary>
        /// A JintContainer is an object responsible for managing all the
        /// JavaScript logic used by MelonJS in the raw base, implementing
        /// bindings, configurations and predefined data.
        /// </summary>
        /// <param name="initialScript">An initial script that will be executed after the setup</param>
        /// <param name="enableConsoleLogging">Enables the console logging related functions</param>
        /// <param name="enableFileSystem">Enables the file system related functions</param>
        public JintContainer(Engine? engine = null)
        {
            _currentApp = new();

            JintStatic.CurrentJintEngine = engine ?? new();
            JintStatic.CurrentJintEngine.SetupAll(_currentApp, this);
        }

        private void HandleUnknownException(Exception e)
        {
            CLNConsole.WriteLine($"> [Unknown Internal Exception] {e.Message} ", ConsoleColor.Red);

            if (EnableStackTracing)
                CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
        }

        public void LoadEntryPoint(string path)
        {
            try
            {
                var content = File.ReadAllText($"{path}\\app.json");
                _currentApp = JsonSerializer.Deserialize<App>(content) ?? new();

                var entryPointScript = File.ReadAllText($"{path}\\{_currentApp.EntryPoint}");

                JintStatic.CurrentJintEngine?.SetValue("__basedir", (path + "\\").Replace("\\", "/"));

                Execute(entryPointScript);
            }
            catch (Exception e)
            {
                HandleUnknownException(e);
            }
        }

        /// <summary>
        /// Executes the declared script string.
        /// </summary>
        /// <param name="script">Script string</param>
        public void Execute(string script)
        {
            try
            {
                JintStatic.CurrentJintEngine?.Execute(script);
            }
            catch(Exception e) when (e is ParserException || e is JavaScriptException)
            {
                dynamic ex = e;
                CLNConsole.WriteLine($"> [Exception in line {ex.LineNumber}] {ex.Error} ", ConsoleColor.Red);

                if(EnableStackTracing)
                    CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
            catch(Exception e)
            {
                HandleUnknownException(e);
            }
        }
    }
}