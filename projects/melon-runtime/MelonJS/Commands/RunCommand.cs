using Cli.NET.Interfaces.Actions;
using MelonJs.JavaScript.Containers;

namespace MelonJS.Commands
{
    public class RunCommand : ICommand
    {
        private readonly MelonContainer _container;

        public RunCommand(MelonContainer container)
        {
            _container = container;
        }

        public void Execute(string[] arguments)
        {
            var script = string.Join(" ", arguments);
            _container.Execute(script);
        }
    }
}