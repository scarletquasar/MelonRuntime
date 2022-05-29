using Cli.NET.Abstractions.Actions;

namespace Cli.NET.Actions
{
    public class ExitCommand : ICommand
    {
        /// <summary>
        /// Default example "exit" command with a given exit code.
        /// </summary>
        /// <param name="args"></param>
        public void Execute(string[] args)
        {
            try { Environment.Exit(int.Parse(args[0])); }
            catch { Environment.Exit(0); }
        }
    }
}