using Cli.NET.Actions;
using Cli.NET.Tools;
using Cli.NET.Models;
using MelonJs.JavaScript.Containers;
using MelonJs.Static.Jint;
using MelonJS.Commands;
using System.Reflection;

/* Generates a new JintContainer and a new Jint engine for execution - no arguments */
JintStatic.CurrentJintEngine = new();

var container = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var engineContainer = new JintContainer(JintStatic.CurrentJintEngine);

/* Getting the project version information and next version data */
var melonVersion = Assembly.GetExecutingAssembly().GetName().Version!.ToString(3);
var melonNextVersion = "[next.3]";

CLNConsole.WriteLine($"Melon v{melonVersion} {melonNextVersion}", ConsoleColor.Yellow);

container.Register(new CommandList()
{
    { "cls", new ClearCommand() },
    { "clear", new ClearCommand() },
    { "info", new InfoCommand($"v{melonVersion} {melonNextVersion}") },
    { "load", new LoadCommand(engineContainer) },
    { "exec", new ExecCommand(engineContainer) },
    { "run", new RunCommand(engineContainer) },
    { "new", new NewCommand() },
    { "exit", new MelonJS.Commands.ExitCommand() }
});

/* Executing the passed command line argument, will be converted in an Melon internal command */
if(!container.ExecuteEnvironmentCommand())
{
    container.WaitForNextCommand();
}