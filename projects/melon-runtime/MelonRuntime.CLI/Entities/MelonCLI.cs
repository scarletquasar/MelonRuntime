using Cli.NET.Tools;
using Jint.Native;
using MelonRuntime.Abstractions.CLI;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Extensions;

namespace MelonRuntime.CLI.Entities
{
    public class MelonCLI : IRuntimeCLI
    {
        private readonly Version _runtimeVersion;
        private IDictionary<string, Action<string[]>> _commands;
        private readonly IMelon<JsValue> _melon;

        public MelonCLI(Version runtimeVersion, IMelon<JsValue> melon)
        {
            _runtimeVersion = runtimeVersion;
            _commands = new Dictionary<string, Action<string[]>>();

            _melon = melon
                .WithCoreFeatures(_runtimeVersion)
                .WithConsoleOutput();

            _commands.Add("--help", x => Console.WriteLine("test"));
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

        public void ExecuteCommand(string name, string[] args)
        {
            if(_commands.ContainsKey(name))
            {
                _commands[name](args);
                return;
            }

            CLNConsole.Write("> ", ConsoleColor.Red);
            CLNConsole.Write(" command", ConsoleColor.White);
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
    }
}
