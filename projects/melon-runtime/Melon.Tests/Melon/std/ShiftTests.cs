using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class ShiftTests
    {
        private readonly Jint.Engine _engine;

        public ShiftTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.shift() should work properly in [true] targets")]
        public void StdShiftShouldWorkProperlyInTrueTargets()
        {
            var script = @"
                let a = 0;
                Melon.std.shift().option(true, () => a++);
                a === 1;
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Melon.std.shift() should work properly in [false] targets")]
        public void StdShiftShouldWorkProperlyInFalseTargets()
        {
            var script = @"
                let a = 0;
                Melon.std.shift().option(false, () => a++);
                a === 0;
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Melon.std.shift() should work properly with multi-options")]
        public void StdShiftShouldWorkProperlyWithMultiOptions()
        {
            var script = @"
                let a = 0;
                Melon.std.shift()
                    .option(true, () => a++)
                    .option(true, () => a++)
                    .option(true, () => a++)
                    .option(true, () => a++)
                    .option(true, () => a++);
                a === 5;
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
