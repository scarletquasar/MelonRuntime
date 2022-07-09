using Autofac;
using Melon.Engine.Builder;

namespace Melon
{
    internal static class Container
    {
        private static IContainer? _container;
        public static ILifetimeScope? Scope;

        public static void Setup(List<string> disallowedList)
        {
            var containerBuilder = new ContainerBuilder();
            var engineBuilder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Standard/std",
                "Standard/console",
                "FileSystem/fs",
                "Data/Set",
                "Data/Map",
                "Data/data",
                "Operations/AsyncLoop",
                "Operations/AsyncTask",
                "Operations/Queue"
            };

            loadList.ForEach(item =>
            {
                if (!disallowedList.Contains(item))
                {
                    engineBuilder.Load(item);
                }
            });

            var engine = engineBuilder.Build();

            containerBuilder.RegisterInstance(engine).As<Jint.Engine>();

            _container = containerBuilder.Build();
            Scope = _container.BeginLifetimeScope();
        }
    }
}
