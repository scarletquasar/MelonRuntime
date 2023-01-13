//Some assembly dependencies need to be (explicitly) used in order to be available in Melon core functions
using MelonRuntime.Domain.Optimization.Entities.Generic;
using System.Reflection;

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
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
        }
    }
}