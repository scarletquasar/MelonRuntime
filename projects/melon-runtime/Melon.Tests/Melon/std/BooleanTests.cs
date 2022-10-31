using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class BooleanTests
    {
        private readonly Jint.Engine _engine;

        public BooleanTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.boolean.checkOne should work correctly")]
        public void StdBooleanCheckOneShouldWorkCorrectly()
        {
            var script = @"Melon.std.boolean.checkOne(x => x === true, [true, false, false])";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Melon.std.boolean.checkAll should work correctly")]
        public void StdBooleanCheckAllShouldWorkCorrectly()
        {
            var script = @"Melon.std.boolean.checkAll(x => x === true, [true, true, true])";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
