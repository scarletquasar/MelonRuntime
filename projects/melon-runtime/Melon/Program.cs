using Cli.NET.Tools;
using System.Reflection;
using Autofac;
using Esprima;
using Jint.Runtime;

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

            var script = Console.ReadLine() ?? "";
            var engine = Container.Scope?.Resolve<Jint.Engine>();

            Execute(script, engine);

            WaitForScript();
        }

        public static void Execute(string script, Jint.Engine? engine)
        {
            try
            {
                engine?.Execute(script);
            }
            catch (Exception e) when (e is ParserException || e is JavaScriptException)
            {
                dynamic ex = e;
                CLNConsole.WriteLine($"> [Exception in line {ex.LineNumber}] {ex.Error} ", ConsoleColor.Red);
                CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
            catch (Exception e)
            {
                CLNConsole.WriteLine($"> [Internal Exception] {e.Message} ", ConsoleColor.Red);
                CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
        }
    }
}