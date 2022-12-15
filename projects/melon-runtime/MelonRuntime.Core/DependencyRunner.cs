//Some assembly dependencies need to be (explicitly) used in order to be available in Melon core functions
using MelonRuntime.Domain.Optimization.Entities;
using System.Reflection;

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
        public static async Task Setup()
        {
            var requiredModules = new string[]
            {
                "Cli.NET",
                "System",
                "System.Runtime",
                "System.Console",
                "System.Text.Json",
                "System.Diagnostics.Process"
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