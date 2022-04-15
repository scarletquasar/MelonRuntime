using Cli.NET.Tools;
using MelonJs.JavaScript.Containers;
using MelonJS;
using MelonJS.Commands;

var container = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var engineContainer = new JintContainer();

CLNConsole.WriteLine(StaticData.ApplicationData(), ConsoleColor.Yellow);
Console.WriteLine();

container.Register(new()
{
    { "run", new ExecuteCommand(engineContainer) }
});

container.WaitForNextCommand();