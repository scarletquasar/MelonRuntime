using Cli.NET.Tools;
using Esprima;
using Jint.Runtime;
using Melon.Engine.Builders;
using Melon.Models;
using Melon.Static.Runtime;
using System.Reflection;

namespace Melon
{
    internal static class Helpers
    {
        internal static Jint.Engine AssembleEngine(EngineAssemblerParameters parameters)
        {
            var engineBuilder = new EngineBuilder();
            var loadList = new List<string>()
            {
                "Dotnet/dotnet",
                "Standard/Set",
                "Standard/Map",
                "Standard/std",
                "Standard/console",
                "FileSystem/fs",
                "Data/Enumerable",
                "Data/IndexedArray",
                "Data/data",
                "Operations/AsyncLoop",
                "Operations/AsyncTask",
                "Operations/Queue",
                "Http/http"
            };

            loadList.ForEach(item =>
            {
                if (!parameters.DisallowedLibraries.Contains(item))
                {
                    if (!parameters.SilentMode)
                    {
                        Console.WriteLine();
                        CLNConsole.Write("[load] ", ConsoleColor.DarkYellow);
                        CLNConsole.Write(item, ConsoleColor.DarkMagenta);
                    }

                    engineBuilder.Load(item);
                }
            });

            if (!parameters.SilentMode)
            {
                Console.WriteLine();
            }

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
        internal static void ExecuteWithHandler(Action action, bool repeat = true, bool keepStackTracing = true)
        {
            try
            {
                action();
            }
            catch (Exception e) when (e is ParserException || e is JavaScriptException)
            {
                dynamic ex = e;
                CLNConsole.WriteLine($"> [Exception in line {ex.LineNumber}] {ex.Error} ", ConsoleColor.Red);

                if(keepStackTracing)
                    CLNConsole.WriteLine(e.StackTrace ?? "", ConsoleColor.DarkRed);
            }
            catch (Exception e)
            {
                CLNConsole.WriteLine($"> [{e.GetType().Name}] {e.Message} ", ConsoleColor.Red);

                if(keepStackTracing)
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
        internal static (bool, List<string>) GetFlagArguments(string[] args)
        {
            var disallowed = args
                .Where(x => x.StartsWith("--disallow["))
                .Select(x => x.Split("[")[1].Replace("]", ""))
                .ToList();

            var silent = args.Where(x => x == "--silent").Any();

            return (silent, disallowed);
        }
        internal static List<string> GetCommandArguments(string[] args)
        {
            return args.Where(x => !x.StartsWith("--")).ToList();
        } 
    }
}
