using MelonRuntime.CLI.Entities;
using MelonRuntime.CLI;
using MelonRuntime.Core;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using MelonRuntime.Abstractions.Generic;
using Jint.Native;
using System.Reflection;

DependencyRunner.Setup();

JsonConvert.DefaultSettings = () => new JsonSerializerSettings
{
    Formatting = Formatting.Indented,
    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
};

var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
Static.CachedAssemblies = assembliesToCache;

var argv = Environment.GetCommandLineArgs();
var version = Assembly.GetExecutingAssembly().GetName().Version!;
var provider = DependencyManager.GetServiceProvider();
var runtime = provider.GetRequiredService<IMelon<JsValue>>();
var cli = new MelonCLI(version, runtime);

cli.DisplayHeader();
cli.ExecuteEntryPoint();

var flags = argv.Where(str => str.StartsWith("--"));
var commands = argv.Skip(2).Where(str => !str.StartsWith("--"));

if(flags.Count() + commands.Count() == 0)
{
    cli.WaitForScript(() => true);
}

var executingFlag = flags.FirstOrDefault();

if(executingFlag != null)
{
    cli.ExecuteCommand(executingFlag, Array.Empty<string>());
}