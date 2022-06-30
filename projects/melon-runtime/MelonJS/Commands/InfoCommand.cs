using Cli.NET.Interfaces.Actions;
using Cli.NET.Tools;
using System.Reflection;

namespace MelonJS.Commands
{
    public class InfoCommand : ICommand
    {
        private string _version;

        public InfoCommand(string version)
        {
            _version = version;
        }

        public void Execute(string[] arguments)
        {
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Melon ", ConsoleColor.Yellow);
            CLNConsole.Write(_version, ConsoleColor.Cyan);
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Github repository: ", ConsoleColor.Green);
            CLNConsole.Write("https://github.com/MelonRuntime/Melon", ConsoleColor.Blue);
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("npm page: ", ConsoleColor.Green);
            CLNConsole.Write("https://www.npmjs.com/package/melon-runtime", ConsoleColor.Blue);
            Console.WriteLine();
        }
    }
}
