using Jint;
using Jint.Native;
using Melon.Engine.Builders;
using System;
using System.Linq;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class ProcessTests
    {
        private readonly Jint.Engine _engine;

        public ProcessTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.process.argv should have the correct value")]
        public void ProcessArgvShouldHaveTheCorrectValue()
        {
            var script = @"Melon.std.process.argv";
            var result = _engine.Evaluate(script).AsArray().ToArray();

            Assert.NotEmpty(result);
        }

        [Fact(DisplayName = "Melon.std.process.env should have the correct value")]
        public void ProcessEnvShouldHaveTheCorrectValue()
        {
            var script = @"JSON.stringify(Melon.std.process.env)";
            var result = _engine.Evaluate(script).AsString();

            Assert.NotNull(result);
            Assert.NotEmpty(result);
        }
    }
}
