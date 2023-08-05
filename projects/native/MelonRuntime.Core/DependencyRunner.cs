using System.Reflection;

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
        //TODO: DependencyRunner class is going to be removed
        //to give plate to a new interoperability module that
        //is focused in solving the curent interoperability
        //problems and giving a new, better interface to
        //profit from DOTNET intrinsic features
        public static void LoadRequiredAssemblies()
        {
            var requiredAssemblies = new string[]
            {
                "netstandard",
                "Cli.NET",
                "System",
                "System.Runtime",
                "System.Console",
                "System.Text.Json",
                "System.Net.Http",
                "System.Diagnostics.Process",
                "Newtonsoft.Json"
            };

            foreach (var assembly in requiredAssemblies) {
                Assembly.Load(assembly);
            }

            //TODO: Dev note: Calling the methods that are for some reason
            //faulting in the loaded assembly content is only a temp
            //way to have it loaded into memory and future usage
            //in the runtime. A better solution may be worked on to avoid
            //inconvenient behaviors in the future.
            System.Text.Json.JsonSerializer.Serialize(new {});
            Cli.NET.Tools.CLNConsole.Write("");
        }
    }
}