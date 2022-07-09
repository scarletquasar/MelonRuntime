using Cli.NET.Tools;
using System.Reflection;
using Autofac;

namespace Melon
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version!.ToString(3);

            CLNConsole.Write("》 Melon ", ConsoleColor.Yellow);
            CLNConsole.Write(version, ConsoleColor.Cyan);
            Console.WriteLine();

            var disallowed = args
                .Where(x => x.StartsWith("--disallow["))
                .Select(x => x.Split("[")[1].Replace("]", ""))
                .ToList();

            Container.Setup(disallowed);

            WaitForScript();
        }

        public static void WaitForScript()
        {
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.Red);

            var script = Console.ReadLine();
            var engine = Container.Scope?.Resolve<Jint.Engine>();

            engine?.Execute(script);

            WaitForScript();
        }
    }
}