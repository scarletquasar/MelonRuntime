﻿using Jint.Native;
using Jint.Runtime;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.CLI;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Cli.NET.Tools;
using MelonRuntime.Core.Library;
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

var provider = dependencies.BuildServiceProvider();
var runtime = provider!.GetService<IMelon<JsValue>>()!;
var bindingsManager = BindingsManager.GetManager(runtime);
var bindings = bindingsManager.GetBindings();

runtime.SetInteropValue("_$internalBinding", bindings);

var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
runtime.LoadFile(classlibPath + "/Scripts/core.js");

runtime.SendInstructions($"Melon.std.melon = {{major: {version.Major}, minor: {version.Minor}, patch: {version.Build}}}");

//Output default actions

runtime.AddOutputAction(obj =>
{
    var value = Convert.ToString(obj)!;
    var values = value.Split("\n").ToList();

    values.ForEach(value =>
    {
        CLNConsole.Write($"< ", ConsoleColor.Green);
        CLNConsole.WriteLine(value, ConsoleColor.DarkGray);
    });
});

runtime.AddRuntimeErrorAction(obj =>
{
    CLNConsole.Write(obj.GetType().Name, ConsoleColor.Red);
    Console.WriteLine();
    CLNConsole.Write($" > ", ConsoleColor.Red);
    Console.WriteLine(obj.Message);

    if (obj.GetType() == typeof(JavaScriptException))
    {
        var dynamicException = (dynamic)obj;
        var stackTraceLines = dynamicException.JavaScriptStackTrace.Split("\n");

        foreach (var line in stackTraceLines)
        {
            CLNConsole.Write($" > ", ConsoleColor.Red);
            Console.WriteLine(line.Trim());
        }
    }
});

runtime.AddExternalErrorAction(obj =>
{
    CLNConsole.Write(obj.GetType().Name, ConsoleColor.Red);
    CLNConsole.Write($" < ", ConsoleColor.Green);
    Console.WriteLine(obj.Message);
});

//Script user detection

void LoopInInstructionsHandler()
{
    CLNConsole.Write("> ", ConsoleColor.Magenta);

    var script = Console.ReadLine()!;
    runtime!.SendInstructions(script);
    LoopInInstructionsHandler();
}

LoopInInstructionsHandler();
