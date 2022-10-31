using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.data
{
    public class DataMethodTests
    {
        private readonly Jint.Engine _engine;

        public DataMethodTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact]
        public void CloneShouldWorkProperly()
        {
            var script = @"
                const value = {a: 1};
                const clone = Melon.data.clone(value);
                clone
            ";

            var cloneItemValue = _engine
                .Evaluate(script)
                .AsObject()
                .GetProperty("a").Value
                .AsNumber();

            Assert.Equal(1, cloneItemValue);
        }

        [Fact]
        public void CompareShouldWorkProperly()
        {
            var script = @"
                const value1 = {a: 1};
                const value2 = {a: 1};
                const equals = Melon.data.compare(value1, value2).equals;
                equals
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
