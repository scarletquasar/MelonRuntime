using Cli.NET.Interfaces.Actions;
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
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Github repository: ", ConsoleColor.Green);
            CLNConsole.Write("https://github.com/MelonRuntime/MelonJS", ConsoleColor.Blue);
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("NPM Page: ", ConsoleColor.Green);
            CLNConsole.Write("https://www.npmjs.com/package/melon-runtime", ConsoleColor.Blue);
            Console.WriteLine();
        }
    }
}
