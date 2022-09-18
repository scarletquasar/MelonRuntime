using Cli.NET.Tools;
using Esprima;
using Jint.Runtime;
using Melon.Engine.Builders;
using Melon.Models;
using Melon.Static.Runtime;
using Newtonsoft.Json;
using System.Reflection;

namespace Melon
{
    internal static class Helpers
    {
        internal static Jint.Engine AssembleEngine(EngineAssemblerParameters parameters)
        {
            var engineBuilder = new EngineBuilder();

            engineBuilder.Load("Bundle/core");
            return engineBuilder.Build();
        }

        internal static void WaitForScript()
        {
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.Red);

            var script = Console.ReadLine() ?? "";
            var engine = Runtime.Engine;

            engine!.Execute(script);
            WaitForScript();
        }

        internal static void ExecuteWithHandler(
            Action action,
            bool repeat = true,
            bool keepStackTracing = true
        )
        {
            try
            {
                action();
            }
            catch (Exception e) when (e is ParserException || e is JavaScriptException)
            {
                dynamic ex = e;
                CLNConsole.WriteLine($"> [{ex.Error}] ", ConsoleColor.Red);

                if (keepStackTracing)
                    CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
            catch (Exception e)
            {
                CLNConsole.WriteLine($"> [{e.GetType().Name}] {e.Message} ", ConsoleColor.Red);

                if (keepStackTracing)
                    CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
            finally
            {
                if (repeat)
                {
                    ExecuteWithHandler(action, repeat);
                }
            }
        }

        internal static void DisplayMelonDefaultInformation()
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version!.ToString(3);

            CLNConsole.Write("》 Melon ", ConsoleColor.Yellow);
            CLNConsole.Write(version, ConsoleColor.Cyan);
            Console.WriteLine();
        }

        internal static List<string> GetDisallowedModules(string[] args)
        {
            var disallowed = args.Where(x => x.StartsWith("--disallow["))
                .Select(x => x.Split("[")[1].Replace("]", ""))
                .ToList();

            return disallowed;
        }

        internal static List<string> GetCommandArguments(string[] args)
        {
            return args.Where(x => !x.StartsWith("--")).ToList();
        }
    }
}
