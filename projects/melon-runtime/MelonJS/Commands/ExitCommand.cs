using Cli.NET.Abstractions.Actions;

namespace MelonJS.Commands
{
    public class ExitCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            Environment.Exit(arguments.Length > 0 ? int.Parse(arguments[0]) : 0);
        }
    }
}
