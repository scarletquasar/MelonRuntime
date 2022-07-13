using Cli.NET.Tools;
using System.Reflection;
using Esprima;
using Jint.Runtime;
using Melon.Engine.Builder;
using Melon.Static.Runtime;
using Melon.Commands;
using Cli.NET.Models;

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

            var silent = args.Where(x => x == "--silent").Any();

            var engineBuilder = new EngineBuilder();

            var loadList = new List<string>()
            {
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
                if (!disallowed.Contains(item))
                {
                    if(!silent)
                    {
                        Console.WriteLine();
                        CLNConsole.Write("[load] ", ConsoleColor.DarkYellow);
                        CLNConsole.Write(item, ConsoleColor.DarkMagenta);
                    }

                    engineBuilder.Load(item);
                }
            });

            if(!silent)
            {
                Console.WriteLine();
            }

            Runtime.Engine = engineBuilder.Build();

            var commands = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);

            commands.Register(new LambdaCommandList()
            {
                { "exit", (string[] args) => Environment.Exit(1) },
                { "run", (string[] args) => Runtime.Engine.Execute(string.Join(" ", args)) }
            });

            commands.Register(new CommandList()
            {
                { "load", new LoadCommand() },
                { "new", new NewCommand() }
            });

            var commandArgs = args.Where(x => !x.StartsWith("--")).ToList();

            try
            {
                if(!ExecuteEnvironmentCommand())
                {
                    WaitForScript();
                }
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

            bool ExecuteEnvironmentCommand()
            {
                switch (commandArgs!.Count)
                {
                    case 1:
                        Console.WriteLine(" ");
                        commands!.CallCommandByName(commandArgs[0]);
                        break;
                    case 2:
                        Console.WriteLine(" ");
                        commands!.CallCommandByName(commandArgs[0], commandArgs[1]);
                        break;
                }

                return commandArgs!.Count > 0;
            }
        }

        public static void WaitForScript()
        {
            Console.WriteLine();
            CLNConsole.Write("> ", ConsoleColor.Red);

            var script = Console.ReadLine() ?? "";
            var engine = Runtime.Engine;

            engine!.Execute(script);
            WaitForScript();
        }
    }
}