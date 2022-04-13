using Cli.NET.Abstractions.Actions;

namespace Cli.NET.Actions
{
    /// <summary>
    /// Default example "echo" command to display data in the console.
    /// </summary>
    public class EchoCommand : ICommand
    {
        public void Execute(string[] arguments) => Console.WriteLine(string.Join(" ", arguments));
    }
}