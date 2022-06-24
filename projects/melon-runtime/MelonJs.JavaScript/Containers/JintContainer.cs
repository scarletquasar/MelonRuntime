using Cli.NET.Tools;
using Esprima;
using Jint;
using Jint.Runtime;
using MelonJs.JavaScript.Extensions;
using MelonJs.Models.BuiltIn;
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
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.LibrariesAndPolyfills, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Engine, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Application, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Environment, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.InputOutput, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.UnsafeScripting, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.DataManagement, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.HttpOperations, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Tools, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Debug, _currentApp, this);
            JintStatic.CurrentJintEngine.SetupFor(BuiltInJsModule.Database, _currentApp, this);
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
                if(path.EndsWith("/") || path.EndsWith("\\"))
                {
                    path = path.Remove(path.Length - 1);
                }
                var content = File.ReadAllText($"{path}/melon.json");
                _currentApp = JsonSerializer.Deserialize<App>(content) ?? new();

                var entryPointScript = File.ReadAllText($"{path}/{_currentApp.EntryPoint}");

                JintStatic.CurrentJintEngine?.SetValue("__basedir__", (path + "\\").Replace("\\", "/"));

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