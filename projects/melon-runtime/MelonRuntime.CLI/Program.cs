using MelonRuntime.CLI.Entities;
using MelonRuntime.CLI;
using MelonRuntime.Core;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using MelonRuntime.Abstractions.Generic;
using Jint.Native;
using System.Reflection;
using MelonRuntime.Core.Entities;

namespace MelonRuntime
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            SetupJsonConfigurations();

            var version = Assembly.GetExecutingAssembly().GetName().Version;
            IMelon<JsValue> runtime = new Melon();

            await DependencyRunner.Setup();
            await SetupAssembliesCache();

            var argv = Array.AsReadOnly(args);
            var cli = new MelonCLI(version, runtime);

            cli.DisplayHeader();
            cli.ExecuteEntryPoint();

            if(argv.Count == 0)
            {
                cli.EnableConsoleOutput();
                cli.WaitForScript(() => true);
            }

            var pivot = args.First();
            var itemIndex = Array.FindIndex<string>(argv.ToArray(), x => x == pivot);
            var rest = argv.Skip(itemIndex).ToArray();

            cli.ExecuteInstruction(pivot, rest);
        }

        private static void SetupJsonConfigurations()
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            };
        }

        private static async Task SetupAssembliesCache()
        {
            await Task.Factory.StartNew(() =>
            {
                var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
                Static.CachedAssemblies = assembliesToCache;
            });
        }
    }
}