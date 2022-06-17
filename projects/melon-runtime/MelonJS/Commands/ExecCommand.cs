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
            _container.Execute("application.end()");
        }
    }
}