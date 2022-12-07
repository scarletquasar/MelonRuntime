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

var argv = Environment.GetCommandLineArgs().Skip(1);
var version = Assembly.GetExecutingAssembly().GetName().Version!;
var provider = DependencyManager.GetServiceProvider();
var runtime = provider.GetRequiredService<IMelon<JsValue>>();
var cli = new MelonCLI(version, runtime);

cli.DisplayHeader();
cli.ExecuteEntryPoint();

var flags = argv.Where(str => str.StartsWith("--"));
var commands = argv.Where(str => !str.StartsWith("--"));

if(flags.Count() + commands.Count() == 0)
{
    cli.WaitForScript(() => true);
}

var executingFlag = flags.FirstOrDefault();

if(executingFlag != null && args.Length == 1)
{
    var itemIndex = Array.FindIndex<string>(argv.ToArray(), x => x == executingFlag);
    var rest = argv.Skip(itemIndex).ToArray();

    cli.ExecuteInstruction(executingFlag, rest);
}

var executingCommand = commands.FirstOrDefault();

if(executingCommand != null)
{
    var itemIndex = Array.FindIndex<string>(argv.ToArray(), x => x == executingCommand);
    var rest = argv.Skip(itemIndex).ToArray();

    cli.ExecuteInstruction(executingCommand, rest);
}