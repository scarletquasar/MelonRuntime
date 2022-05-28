using Cli.NET.Abstractions.Actions;
using MelonJs.JavaScript.Containers;

namespace MelonJS.Commands
{
    public class LoadCommand : ICommand
    {
        private readonly JintContainer _container;

        public LoadCommand(JintContainer container)
        {
            _container = container;
        }

        public void Execute(string[] arguments)
        {
            var script = string.Join(" ", arguments);
            _container.LoadEntryPoint(script);
        }
    }
}
