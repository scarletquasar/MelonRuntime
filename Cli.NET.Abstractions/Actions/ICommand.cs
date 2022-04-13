namespace Cli.NET.Abstractions.Actions
{
    public interface ICommand
    {
        public void Execute(string[] arguments);
    }
}