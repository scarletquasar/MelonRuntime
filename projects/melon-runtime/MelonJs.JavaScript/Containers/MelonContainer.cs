using Cli.NET.Tools;
using Esprima;
using Jint;
using Jint.Runtime;
using MelonJs.JavaScript.Extensions;
using MelonJs.Models.BuiltIn;
using MelonJs.Models.Project;
using MelonJs.Static.Jint;
using System.Diagnostics;
using System.Text.Json;

namespace MelonJs.JavaScript.Containers
{
    public class MelonContainer
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
        public MelonContainer(
            Engine engine, 
            string melonVersion, 
            string melonNextVersion, 
            bool silent,
            List<BuiltInJsModule> disabledModules,
            List<string> disabledInternals)
        {
            CLNConsole.WriteLine($"Melon v{melonVersion} {melonNextVersion}", ConsoleColor.Yellow);
            Console.WriteLine();

            _currentApp = new();

            List<BuiltInJsModule> modules = new()
            {
                BuiltInJsModule.LibrariesAndPolyfills,
                BuiltInJsModule.Engine,
                BuiltInJsModule.Application,
                BuiltInJsModule.Environment,
                BuiltInJsModule.InputOutput,
                BuiltInJsModule.UnsafeScripting,
                BuiltInJsModule.DataManagement,
                BuiltInJsModule.HttpOperations,
                BuiltInJsModule.Tools,
                BuiltInJsModule.Debug,
                BuiltInJsModule.Database
            };

            disabledModules.ForEach(module => {
                modules.Remove(module);
            });

            JintStatic.CurrentJintEngine = engine;

            try
            {
                foreach (var module in modules)
                {
                    var watch = new Stopwatch();
                    watch.Start();
                    JintStatic.CurrentJintEngine.SetupFor(module, _currentApp, this);
                    watch.Stop();

                    if (!silent)
                    {
                        CLNConsole.Write("[info] ", ConsoleColor.DarkMagenta);
                        CLNConsole.Write($"({DateTime.Now}) ", ConsoleColor.Cyan);
                        CLNConsole.Write("Loaded module ", ConsoleColor.White);
                        CLNConsole.Write($"{module} ", ConsoleColor.Yellow);
                        CLNConsole.Write("successfully ", ConsoleColor.Green);
                        CLNConsole.Write("in ", ConsoleColor.White);

                        var timeColor = watch.ElapsedMilliseconds < 500 ? ConsoleColor.Green : ConsoleColor.Red;
                        CLNConsole.Write($"{watch.ElapsedMilliseconds}ms ", timeColor);
                        Console.WriteLine();
                    }
                }
            }
            catch (Exception ex)
            {
                if (!silent)
                {
                    CLNConsole.Write($"[error] ({DateTime.Now}) ", ConsoleColor.Red);
                    CLNConsole.Write(ex.ToString(), ConsoleColor.White);
                }
            }

            Console.WriteLine();
        }

        private void HandleUnknownException(Exception e)
        {
            CLNConsole.WriteLine($"> [Internal Exception] {e.Message} ", ConsoleColor.Red);

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