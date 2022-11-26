using Jint.Native;
using MelonRuntime.CLI.Extensions;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.CLI;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Cli.NET.Tools;
using MelonRuntime.Core;
using Newtonsoft.Json;

Console.Title = "Melon Runtime";
DependencyRunner.Setup();

JsonConvert.DefaultSettings = () => new JsonSerializerSettings
{
    Formatting = Formatting.Indented,
    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
};

var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
Static.CachedAssemblies = assembliesToCache;

//Fist display screen

var version = Assembly.GetExecutingAssembly().GetName().Version!;
var versionString = version.ToString(3);

CLNConsole.Write("Melon ", ConsoleColor.Magenta);
CLNConsole.Write(versionString, ConsoleColor.Green);
Console.WriteLine();
Console.WriteLine();

//Dependency injection and bindings setup

IServiceCollection dependencies = new ServiceCollection();
dependencies.AddMelonRuntime();
ServiceProvider provider = dependencies.BuildServiceProvider();

var runtime = provider
    .GetRequiredService<IMelon<JsValue>>()
    .WithCoreFeatures(version)
    .WithConsoleOutput();

void LoopInInstructionsHandler()
{
    CLNConsole.Write("> ", ConsoleColor.Magenta);

    var script = Console.ReadLine()!;
    runtime!.SendInstructions(script);
    LoopInInstructionsHandler();
}

LoopInInstructionsHandler();
