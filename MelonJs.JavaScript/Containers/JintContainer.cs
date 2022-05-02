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

        /// <summary>
        /// A JintContainer is an object responsible for managing all the
        /// JavaScript logic used by MelonJS in the raw base, implementing
        /// bindings, configurations and predefined data.
        /// </summary>
        /// <param name="initialScript">An initial script that will be executed after the setup</param>
        /// <param name="enableConsoleLogging">Enables the console logging related functions</param>
        /// <param name="enableFileSystem">Enables the file system related functions</param>
        public JintContainer(
            string? initialScript = null,
            bool enableConsoleLogging = true,
            bool enableFileSystem = true,
            bool enableDefaultConstructors = true,
            bool enableHttpOperations = true)
        {
            _engine = new();
            _engine.SetupSystemVariables();

            if (enableFileSystem) _engine.EnableFileSystem();
            if (enableConsoleLogging) _engine.EnableConsoleLogging();
            if (enableDefaultConstructors) _engine.EnableDefaultConstructors();
            if (enableHttpOperations) _engine.EnableHttpOperations();

            _engine.Execute(initialScript ?? "");
        }

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
            }
            catch(Exception e)
            {
                CLNConsole.WriteLine
                    ($"> [Unknown Internal Exception] {e.ToString()} ", ConsoleColor.DarkRed);
            }
        }
    }
}