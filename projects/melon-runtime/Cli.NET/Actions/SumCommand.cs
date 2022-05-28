using Cli.NET.Abstractions.Actions;

namespace Cli.NET.Actions
{
    public class SumCommand : ICommand
    {
        public void Execute(string[] arguments) 
        {
            try { Console.WriteLine(long.Parse(arguments[0]) + long.Parse(arguments[1])); }
            catch { Console.WriteLine("NaN"); }
        }
    }
}