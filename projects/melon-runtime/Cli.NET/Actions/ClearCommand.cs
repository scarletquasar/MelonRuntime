using Cli.NET.Abstractions.Actions;

namespace Cli.NET.Actions
{
    /// <summary>
    /// Default example "clear" command to erase the information in the screen
    /// and writes new information if given.
    /// </summary>
    public class ClearCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            Console.Clear();

            if(arguments.Any())
                Console.WriteLine(string.Join("", arguments));
        }
    }
}