//Some assembly dependencies need to be (explicitly) used in order to be available in Melon core functions
using MelonRuntime.Domain.Optimization.Entities.Generic;
using System.Reflection;

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
        public static async Task Setup()
        {
            var requiredModules = new string[]
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

            var moduleGetters = ChunkModuleGetters(requiredModules);
            
            await Task.WhenAll(moduleGetters);
        }

        private static IEnumerable<Task> ChunkModuleGetters(string[] values)
        {
            var chunked = new ChunkedList<string>(values, values.Length / 3);

            var tasks = chunked.Select(operations =>
            {
                var loadChunk = Task.Factory.StartNew(() =>
                {
                    foreach (var operation in operations)
                    {
                        Assembly.Load(operation);
                    }
                });

                return loadChunk;
            });

            return tasks;
        }
    }
}