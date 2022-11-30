using Microsoft.Extensions.DependencyInjection;

namespace MelonRuntime.CLI
{
    public static class DependencyManager
    {
        public static IServiceProvider GetServiceProvider()
        {
            IServiceCollection dependencies = new ServiceCollection();
            dependencies.AddMelonRuntime();
            ServiceProvider provider = dependencies.BuildServiceProvider();
            
            return provider;
        }
    }
}
