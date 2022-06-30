using Cli.NET.Interfaces.Actions;
using MelonJs.JavaScript.Containers;

namespace MelonJS.Commands
{
    public class ExecCommand : ICommand
    {
        private readonly JintContainer _container;

        public ExecCommand(JintContainer container)
        {
            _container = container;
        }

        public void Execute(string[] arguments)
        {
            var path = arguments[0];
            _container.Execute(File.ReadAllText(path));

            /* 
             * Calling "application.end()" will force a true clean into the container and internal Engine, then Melon
             * will be able to run a new application without variable conflicts and security breaches
             */
            _container.Execute("application.end()");
        }
    }
}