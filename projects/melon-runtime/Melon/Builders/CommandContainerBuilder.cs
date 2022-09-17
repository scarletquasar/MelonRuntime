using Cli.NET.Models;
using Cli.NET.Tools;

namespace Melon.Builders
{
    internal class CommandContainerBuilder
    {
        private readonly CommandContainer _container;
        private readonly List<Action> _actions;

        internal CommandContainerBuilder(string indicator, ConsoleColor color)
        {
            _container = new(indicator, indicatorColor: color);
            _actions = new();
        }

        internal CommandContainerBuilder SetupLambdaCommands(LambdaCommandList commands)
        {
            _actions.Add(() => _container.Register(commands));
            return this;
        }

        internal CommandContainerBuilder SetupCommands(CommandList commands)
        {
            _actions.Add(() => _container.Register(commands));
            ;
            return this;
        }

        internal CommandContainer Build()
        {
            _actions.ForEach(action => action());
            return _container;
        }
    }
}
