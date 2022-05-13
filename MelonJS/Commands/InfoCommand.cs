using Cli.NET.Abstractions.Actions;
using Cli.NET.Tools;
using System.Reflection;

namespace MelonJS.Commands
{
    public class InfoCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version ?? new();

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("MelonJS ", ConsoleColor.Yellow);
            CLNConsole.Write(version.ToString(), ConsoleColor.Cyan);
            Console.WriteLine();
        }
    }
}
