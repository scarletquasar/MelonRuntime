using Cli.NET.Interfaces.Actions;
using MelonJs.JavaScript.Containers;

namespace MelonJS.Commands
{
    public class LoadCommand : ICommand
    {
        private readonly MelonContainer _container;

        public LoadCommand(MelonContainer container)
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
