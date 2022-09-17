using Cli.NET.Interfaces.Actions;
using Melon.Static.Runtime;

namespace Melon.Commands
{
    public class LoadCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var path = string.Join(" ", arguments);
            var entryPoint = File.ReadAllText(path);

            Helpers.ExecuteWithHandler(() => Runtime.Engine!.Execute(entryPoint), false);
        }
    }
}
