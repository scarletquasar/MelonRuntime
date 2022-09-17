using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class JsonTests
    {
        private readonly Jint.Engine _engine;

        public JsonTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.json.tryParse should work correctly")]
        public void StdJsonTryParseShouldWorkCorrectly()
        {
            var script =
                @"
                const parsed = Melon.std.json.tryParse('{}');
                JSON.stringify(parsed) === '{}';
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Melon.std.json.tryStringify should work correctly")]
        public void StdJsonTryStringifyShouldWorkCorrectly()
        {
            var script =
                @"
                const stringified = Melon.std.json.tryStringify({});
                stringified === '{}';
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
