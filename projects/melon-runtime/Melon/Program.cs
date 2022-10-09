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
            Console.Title = "Melon Runtime";

            Helpers.DisplayMelonDefaultInformation();

            Runtime.Realms = new();
            Runtime.Engine = MakeEngine(args);
            Runtime.CommandContainer = MakeCommandContainer();

            HandleInputs(args);
        }

        private static Jint.Engine MakeEngine(string[] args)
        {
            return Helpers.AssembleEngine();
        }

        private static CommandContainer MakeCommandContainer()
        {
            void safeExecuteScript(string[] args)
            {
                Helpers.ExecuteWithHandler(
                    () => Runtime.Engine?.Execute(string.Join(" ", args)),
                    false
                );
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
            var commandExecution = true;
            var handlerLambda = () =>
            {
                commandExecution = Runtime.CommandContainer!.ExecuteCommands(commandArgs);
            };

            Helpers.ExecuteWithHandler(handlerLambda, false, false);

            if (!commandExecution)
            {
                Console.WriteLine();
                Helpers.ExecuteWithHandler(Helpers.WaitForScript);
            }
        }
    }
}
