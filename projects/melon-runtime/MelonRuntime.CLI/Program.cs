using MelonRuntime.CLI.Entities;
using MelonRuntime.CLI;
using MelonRuntime.Core;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using MelonRuntime.Abstractions.Generic;
using Jint.Native;
using System.Reflection;

namespace MelonRuntime
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            SetupJsonConfigurations();

            var actions = new Task[]
            {
                DependencyRunner.Setup(),
                SetupAssembliesCache()
            };

            await Task.WhenAll(actions);

            var argv = Array.AsReadOnly(args.Skip(1).ToArray());
            var version = Assembly.GetExecutingAssembly().GetName().Version;
            var provider = DependencyManager.GetServiceProvider();
            var runtime = provider.GetRequiredService<IMelon<JsValue>>();
            var cli = new MelonCLI(version, runtime);

            cli.DisplayHeader();
            cli.ExecuteEntryPoint();

            if(argv.Count == 0)
            {
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
            await Task.Run(() =>
            {
                var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
                Static.CachedAssemblies = assembliesToCache;
            });
        }
    }
}