using Jint;
using Melon.Engine.Builders;
using Xunit;

namespace Melon.Tests.Melon.dotnet
{
    public class DotnetMethodTests
    {
        private readonly Jint.Engine _engine;

        public DotnetMethodTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact]
        public void GetFactoriesShouldWorkCorrectly()
        {
            var script = @"
                const system = Melon.dotnet.getFactories('System');
                const random = system.random.new();
                random.next();
            ";

            var result = _engine.Evaluate(script).IsNumber();

            Assert.True(result);
        }

        [Fact]
        public void GetStaticPropertyShouldWorkCorrectly()
        {
            var script = @"
                const title = Melon.dotnet.getStaticProperty('System:Console:Title');
                title
            ";

            var result = _engine.Evaluate(script);

            Assert.True(result.IsString());
            Assert.NotEmpty(result.AsString());
        }

        [Fact]
        public void GetStaticMethodShouldWorkCorrectly()
        {
            var script = @"
                const env = Melon.dotnet.getStaticMethod('System:Environment:GetEnvironmentVariables');
                env
            ";

            var result = _engine.Evaluate(script);

            Assert.False(result.IsUndefined() || result.IsNull());
            Assert.True(result.IsObject());
        }
    }
}
