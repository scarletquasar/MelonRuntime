using Cli.NET.Actions;
using Cli.NET.Tools;
using Cli.NET.Models;
using MelonJs.JavaScript.Containers;
using MelonJs.Static.Jint;
using MelonJS;
using MelonJS.Commands;

JintStatic.CurrentJintEngine = new();

var container = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var engineContainer = new JintContainer(JintStatic.CurrentJintEngine);

CLNConsole.WriteLine(StaticData.ApplicationData(), ConsoleColor.Yellow);

container.Register(new CommandList()
{
    { "cls", new ClearCommand() },
    { "clear", new ClearCommand() },
    { "info", new InfoCommand() },
    { "load", new LoadCommand(engineContainer) },
    { "exec", new ExecCommand(engineContainer) },
    { "run", new RunCommand(engineContainer) },
    { "new", new NewCommand() },
    { "exit", new MelonJS.Commands.ExitCommand() }
});

if(!container.ExecuteEnvironmentCommands())
{
    container.WaitForNextCommand();
}