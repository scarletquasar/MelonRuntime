using Cli.NET.Actions;
using Cli.NET.Tools;
using Cli.NET.Models;
using MelonJs.JavaScript.Containers;
using MelonJs.Static.Jint;
using MelonJS.Commands;
using System.Reflection;
using MelonJs.Models.BuiltIn;

var argFlags = Environment.GetCommandLineArgs().Where(com => com.StartsWith("--")).ToList();

var silent = argFlags.Any(x => x is "--silent");
var disabledModules = new List<BuiltInJsModule>();
var disabledInternals = new List<string>();

argFlags.ForEach(flag =>
{
    if(flag.StartsWith("--disable-module"))
    {
        var parts = flag.Split("[");
        disabledModules.Add(Enum.Parse<BuiltInJsModule>(parts[1].Replace("]", "")));
    }

    if(flag.StartsWith("--disable-internal"))
    {
        var parts = flag.Split("[");
        disabledInternals.Add(parts[1].Replace("]", ""));
    }
});

/* Getting the project version information and next version data */
var melonVersion = Assembly.GetExecutingAssembly().GetName().Version!.ToString(3);
var melonNextVersion = "[next.5]";

/* Generates a new JintContainer and a new Jint engine for execution - no arguments */
JintStatic.CurrentJintEngine = new();

var commands = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var melon = 
    new MelonContainer(JintStatic.CurrentJintEngine, melonVersion, melonNextVersion, silent, disabledModules, disabledInternals);

commands.Register(new CommandList()
{
    { "info", new InfoCommand($"v{melonVersion} {melonNextVersion}") },
    { "cls", new ClearCommand() },
    { "clear", new ClearCommand() },
    { "load", new LoadCommand(melon) },
    { "exec", new ExecCommand(melon) },
    { "run", new RunCommand(melon) },
    { "new", new NewCommand() },
    { "exit", new ExitCommand() }
});

/* Executing the passed command line argument, will be converted in an Melon internal command */
var argCommands = Environment.GetCommandLineArgs().Skip(2).Where(com => !com.StartsWith("--")).ToList();

bool ExecuteEnvironmentCommand()
{
    switch (argCommands!.Count)
    {
        case 1:
            commands!.CallCommandByName(argCommands[0]);
            break;
        case 2:
            commands!.CallCommandByName(argCommands[0], argCommands[1]);
            break;
    }

    return argCommands!.Count > 0;
}

if (!ExecuteEnvironmentCommand())
{
    commands.WaitForNextCommand();
}