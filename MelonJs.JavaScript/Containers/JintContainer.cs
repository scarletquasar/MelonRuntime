using Cli.NET.Tools;
using Esprima;
using Jint;
using Jint.Runtime;
using MelonJs.JavaScript.Extensions;

namespace MelonJs.JavaScript.Containers
{
    public class JintContainer
    {
        private readonly Engine _engine;
        public bool EnableStackTracing;

        /// <summary>
        /// A JintContainer is an object responsible for managing all the
        /// JavaScript logic used by MelonJS in the raw base, implementing
        /// bindings, configurations and predefined data.
        /// </summary>
        /// <param name="initialScript">An initial script that will be executed after the setup</param>
        /// <param name="enableConsoleLogging">Enables the console logging related functions</param>
        /// <param name="enableFileSystem">Enables the file system related functions</param>
        public JintContainer(
            Engine? engine = null,
            string? initialScript = null,
            bool enableStackTracing = false,
            bool enableConsoleLogging = true,
            bool enableFileSystem = true,
            bool enableDefaultConstructors = true,
            bool enableHttpOperations = true)
        {
            _engine = engine ?? new();
            _engine.SetupSystemVariables();
            _engine.SetupDebugMethods(this);

            EnableStackTracing = enableStackTracing;

            if (enableFileSystem) _engine.EnableFileSystem();
            if (enableConsoleLogging) _engine.EnableConsoleLogging();
            if (enableDefaultConstructors) _engine.EnableDefaultConstructors();
            if (enableHttpOperations) _engine.EnableHttpOperations();

            _engine.Execute(initialScript ?? "");
        }

        /// <summary>
        /// Executes the declared script string.
        /// </summary>
        /// <param name="script">Script string</param>
        public void Execute(string script)
        {
            try
            {
                _engine.Execute(script);
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
                CLNConsole.WriteLine
                    ($"> [Unknown Internal Exception] {e.Message} ", ConsoleColor.Red);

                if (EnableStackTracing)
                    CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
        }
    }
}