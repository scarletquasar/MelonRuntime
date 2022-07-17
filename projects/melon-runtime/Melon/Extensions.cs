using Cli.NET.Tools;

namespace Melon
{
    internal static class Extensions
    {
        internal static bool ExecuteCommands(this CommandContainer commands, List<string> commandArgs)
        {
            switch (commandArgs!.Count)
            {
                case 1:
                    Console.WriteLine(" ");
                    commands!.CallCommandByName(commandArgs[0]);
                    break;
                case 2:
                    Console.WriteLine(" ");
                    commands!.CallCommandByName(commandArgs[0], commandArgs[1]);
                    break;
            }

            return commandArgs!.Count > 0;
        }
    }
}