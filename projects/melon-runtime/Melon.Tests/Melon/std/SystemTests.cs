using Jint;
using Melon.Engine.Builders;
using System;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class SystemTests
    {
        private readonly Jint.Engine _engine;

        public SystemTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.system.osInformation should have the correct data")]
        public void OsInformationShouldHaveCorrectData()
        {
            var script = @"Melon.std.system.osInformation";
            var result = _engine.Evaluate(script).AsObject();

            var platform = (PlatformID)(result.Get("platform").AsNumber());
            var version = result.Get("version").AsString();
            var servicePack = result.Get("servicePack").AsString();

            Assert.Equal(Environment.OSVersion.Platform, platform);
            Assert.Equal(Environment.OSVersion.VersionString, version);
            Assert.Equal(Environment.OSVersion.ServicePack, servicePack);
        }
    }
}
