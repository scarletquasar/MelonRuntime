using Cli.NET.Tools;
using MelonJs.JavaScript.Containers;
using MelonJS.Commands;

var container = new CommandContainer();
var engineContainer = new JintContainer();

container.Register(new()
{
    { "", new ExecuteCommand(engineContainer) }
});

container.WaitForNextCommand();