using Cli.NET.Tools;
using Cli.NET.Models;
using Melon.Static.Runtime;
using Melon.Commands;
using Melon.Models;
using Melon.Builders;

namespace Melon
{
    internal class Program
    {
        internal static void Main(string[] args)
        {
            Helpers.DisplayMelonDefaultInformation();

            Runtime.Engine = MakeEngine(args);
            Runtime.CommandContainer = MakeCommandContainer();

            HandleInputs(args);
        }
        private static Jint.Engine MakeEngine(string[] args)
        {
            var (silentMode, disallowedLibraries) = Helpers.GetFlagArguments(args);
            var engineParameters = new EngineAssemblerParameters(disallowedLibraries, silentMode);

            return Helpers.AssembleEngine(engineParameters);
        }
        private static CommandContainer MakeCommandContainer()
        {
            void safeExecuteScript(string[] args)
            {
                Helpers.ExecuteWithHandler(() => Runtime.Engine?.Execute(string.Join(" ", args)), false);
            }

            var lambdaCommands = new LambdaCommandList()
            {
                { "exit", (string[] args) => Environment.Exit(1) },
                { "run", (string[] args) => safeExecuteScript(args) }
            };

            var commands = new CommandList()
            {
                { "load", new LoadCommand() },
                { "new", new NewCommand() }
            };

            var commandContainerBuilder = new CommandContainerBuilder("> ", ConsoleColor.Green);
            var commandContainer = commandContainerBuilder
                .SetupLambdaCommands(lambdaCommands)
                .SetupCommands(commands)
                .Build();

            return commandContainer;
        }
        private static void HandleInputs(string[] args)
        {
            var commandArgs = Helpers.GetCommandArguments(args);
            var commandExecution = Runtime.CommandContainer!.ExecuteCommands(commandArgs);

            if (!commandExecution)
            {
                Helpers.ExecuteWithHandler(Helpers.WaitForScript);
            }
        }
    }
}