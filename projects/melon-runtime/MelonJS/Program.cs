using Cli.NET.Actions;
using Cli.NET.Tools;
using MelonJs.JavaScript.Containers;
using MelonJs.Static.Jint;
using MelonJS;
using MelonJS.Commands;

JintStatic.CurrentJintEngine = new();

var container = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var engineContainer = new JintContainer(JintStatic.CurrentJintEngine);

CLNConsole.WriteLine(StaticData.ApplicationData(), ConsoleColor.Yellow);

container.Register(new()
{
    { "cls", new ClearCommand() },
    { "clear", new ClearCommand() },
    { "info", new InfoCommand() },
    { "load", new LoadCommand(engineContainer) },
    { "exec", new ExecCommand(engineContainer) },
    { "run", new RunCommand(engineContainer) },
    { "exit", new MelonJS.Commands.ExitCommand() },
    { "new", new NewCommand() }
});

if(!container.ExecuteEnvironmentCommand())
{
    container.WaitForNextCommand();
}