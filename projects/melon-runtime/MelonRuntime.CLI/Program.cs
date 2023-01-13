using MelonRuntime.CLI.Entities;
using MelonRuntime.Core;
using Newtonsoft.Json;
using MelonRuntime.Abstractions.Generic;
using Jint.Native;
using System.Reflection;
using MelonRuntime.Core.Entities;
using static MelonRuntime.Core.DependencyRunner;

namespace MelonRuntime
{
    public class Program
    {
        public static void Main(string[] args)
        {
            SetupJsonConfigurations();

            var version = Assembly.GetExecutingAssembly().GetName().Version;
            IMelon<JsValue> runtime = new Melon();

            LoadRequiredAssemblies();
            LoadDomainAssemblies();

            var cli = new MelonCLI(version, runtime);

            cli.DisplayHeader();
            cli.ExecuteEntryPoint();

            if(args.Length == 0)
            {
                cli.EnableConsoleOutput();
                cli.WaitForScript(() => true);
            }

            var pivot = args.First();
            var itemIndex = Array.FindIndex(args, x => x == pivot);
            var rest = args.Skip(itemIndex).ToArray();

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

        private static void LoadDomainAssemblies()
        {
            var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
            Static.CachedAssemblies = assembliesToCache;
        }
    }
}