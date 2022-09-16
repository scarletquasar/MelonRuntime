using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class MelonTests
    {
        private readonly Jint.Engine _engine;

        public MelonTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.melon.currentVersion should be a valid version")]
        public void StdMelonCurrentVersionShouldBeAValidVersion()
        {
            var script = @"Melon.std.melon.currentVersion instanceof Melon.Version";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
