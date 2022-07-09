using Autofac;
using Melon.Engine.Builder;

namespace Melon
{
    internal static class Container
    {
        private static IContainer? _container;
        public static ILifetimeScope? Scope;

        public static void Setup()
        {
            var containerBuilder = new ContainerBuilder();
            var engineBuilder = new EngineBuilder();

            var engine = engineBuilder
              .Load("Standard/std")
              .Load("Standard/console")
              .Load("FileSystem/fs")
              .Load("Data/data")
              .Build();

            containerBuilder.RegisterInstance(engine).As<Jint.Engine>();

            _container = containerBuilder.Build();
            Scope = _container.BeginLifetimeScope();
        }
    }
}
