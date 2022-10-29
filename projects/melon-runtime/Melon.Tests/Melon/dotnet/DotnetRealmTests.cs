using Jint;
using Melon.Engine.Builders;
using Melon.Static.Runtime;
using Xunit;

namespace Melon.Tests.Melon.dotnet
{
    public class DotnetRealmTests
    {
        private readonly Jint.Engine _engine;

        public DotnetRealmTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact]
        public void RealmInstanceShouldWorkProperly()
        {
            Runtime.Engine = _engine;
            Runtime.Realms = new();

            var script = @"
                const realm = new Melon.dotnet.Realm();
                realm.setInstance('random', 'System:Random');
                const random = realm.get('random');
                random.next()
            ";

            var result = _engine.Evaluate(script).IsNumber();

            Assert.True(result);

            Runtime.Engine = null;
            Runtime.Realms = null;
        }

        [Fact]
        public void RealmValueShouldWorkProperly()
        {
            Runtime.Engine = _engine;
            Runtime.Realms = new();

            var script = @"
                const realm = new Melon.dotnet.Realm();
                realm.setValue('value', 1);
                realm.get('value')
            ";

            var result = _engine.Evaluate(script).IsNumber();

            Assert.True(result);

            Runtime.Engine = null;
            Runtime.Realms = null;
        }
    }
}
