using Cli.NET.Tools;
using Jint.Native;
using MelonRuntime.Abstractions.CLI;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.CLI.Properties;
using MelonRuntime.Core.Extensions;
using MelonRuntime.ProjectGenerator;

namespace MelonRuntime.CLI.Entities
{
    public class MelonCLI : IRuntimeCLI
    {
        private readonly Version _runtimeVersion;
        private readonly IDictionary<string, Action<string[]>> _commands;
        private readonly IMelon<JsValue> _melon;

        public MelonCLI(Version runtimeVersion, IMelon<JsValue> melon)
        {
            _runtimeVersion = runtimeVersion;
            _commands = new Dictionary<string, Action<string[]>>();

            _melon = melon
                .WithCoreFeatures(_runtimeVersion)
                .WithConsoleOutput();

            _commands.Add("--help", HelpCommand);
            _commands.Add("load", LoadCommand);
            _commands.Add("run", RunCommand);
            _commands.Add("new", NewCommand);
        }

        public void ExecuteEntryPoint()
        {
            var currentPath = Directory.GetCurrentDirectory();

            if (File.Exists($"{currentPath}/main.js"))
            {
                _melon.LoadFile($"{currentPath}/main.js", true);
            }
        }

        public void AddCommand(string name, Action<string[]> action)
        {
            _commands.Add(name, action);
        }

        public void ExecuteInstruction(string name, string[] args)
        {
            if(_commands.ContainsKey(name))
            {
                _commands[name](args);
                return;
            }

            CLNConsole.Write(">", ConsoleColor.Red);
            CLNConsole.Write(" Command", ConsoleColor.White);
            CLNConsole.Write($" {name}", ConsoleColor.Red);
            CLNConsole.WriteLine(" not found.", ConsoleColor.White);
        }

        public void WaitForScript(Func<bool> loopCondition)
        {
            Console.Title = "Melon Runtime";
            CLNConsole.Write("> ", ConsoleColor.Magenta);

            var script = Console.ReadLine() ?? "";
            _melon.SendInstructions(script);

            if(loopCondition())
            {
                WaitForScript(loopCondition);
            }
        }

        public void DisplayHeader()
        {
            var versionString = _runtimeVersion.ToString(3);

            CLNConsole.Write("Melon ", ConsoleColor.Magenta);
            CLNConsole.Write(versionString, ConsoleColor.Green);
            Console.WriteLine();
            Console.WriteLine();
        }

        private void HelpCommand(string[] args)
        {
            Console.WriteLine(Resources.HelpDefaultText);
        }

        private static void DisplayInvalidCommandUsage()
        {
            CLNConsole.Write("[Error]", ConsoleColor.Red);
            CLNConsole.Write(" Invalid command usage.");
            Console.WriteLine();
            Console.WriteLine();
        }

        private void LoadCommand(string[] args)
        {
            try
            {
                if (!args.Contains("--help"))
                {
                    _melon.LoadFile(args[1], true);
                    return;
                }
            }
            catch 
            {
                throw;
                DisplayInvalidCommandUsage();
            }

            Console.WriteLine(Resources.HelpLoadText);
        }

        private void RunCommand(string[] args)
        {
            try
            {
                if (!args.Contains("--help"))
                {
                    _melon.SendInstructions(args[1]);
                    Environment.Exit(0);
                }
            }
            catch
            {
                DisplayInvalidCommandUsage();
            }

            Console.WriteLine(Resources.HelpRunText);
        }

        private void NewCommand(string[] args)
        {
            try
            {
                if (!args.Contains("--help"))
                {
                    var type = "typescript";
                    var path = "./";

                    if (args.Length > 1)
                    {
                        path = args[1];
                    }

                    if (args.Length > 2)
                    {
                        type = args[2];
                    }

                    var schema = type == "javascript" ? ProjectWriter.JavaScript : ProjectWriter.TypeScript;
                    var projectWriter = new ProjectWriter(schema, path, true, true);

                    projectWriter.Write();

                    Console.WriteLine();

                    CLNConsole.Write(">", ConsoleColor.Magenta);
                    CLNConsole.Write(" Project", ConsoleColor.Yellow);
                    CLNConsole.Write(" created", ConsoleColor.Cyan);
                    CLNConsole.Write(" with success.", ConsoleColor.Yellow);
                    Console.WriteLine();

                    CLNConsole.Write(">", ConsoleColor.Magenta);
                    CLNConsole.Write(" Use", ConsoleColor.Yellow);
                    CLNConsole.Write(" npm install", ConsoleColor.Cyan);
                    CLNConsole.Write(" to install the dependencies.", ConsoleColor.Yellow);
                    Console.WriteLine();
                }
            }
            catch
            {
                DisplayInvalidCommandUsage();
            }
        }
    }
}
