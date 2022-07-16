using Jint;
using Melon.Engine.Builder;
using System;
using System.Collections.Generic;
using System.IO;
using Xunit;

namespace Melon.Tests.ScriptLibrary.Standards
{
    public class StdLibraryTests
    {
        private readonly Jint.Engine _engine;

        public StdLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Standard/std"
            };

            loadList.ForEach(x => builder.Load(x));
            _engine = builder.Build();
        }

        [Fact(DisplayName = "'std' Promise should be a valid promise")]
        public void StdPromiseShouldBeAValidPromise()
        {
            var script = @"std.Promise.constructor.name === Promise.constructor.name";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'std' shift() method should work correctly")]
        public void StdShiftMethodShouldWorkCorrectly()
        {
            var script = @"
                let a;
                std.shift(1).option(1, (x) => a = x);
                a;
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "'std' system.osInformation() method should work correctly")]
        public void StdSystemOsInformationShouldHaveCorrectData()
        {
            var script = @"std.system.osInformation()";
            var result = _engine.Evaluate(script).AsObject();

            Assert.Equal(Environment.OSVersion.Platform.ToString(), result.Get("platform"));
            Assert.Equal(Environment.OSVersion.VersionString, result.Get("version"));
            Assert.Equal(Environment.OSVersion.ServicePack, result.Get("servicePack"));
        }

        [Fact(DisplayName = "'std' system.environment.currentDirectory() method return should be valid")]
        public void StdSystemEnvironmentCurrentDirectoryShouldBeValid()
        {
            var script = @"std.environment.currentDirectory()";
            var result = _engine.Evaluate(script).AsString();

            Assert.NotEmpty(result);
        }

        [Fact(DisplayName = "'std' system.environment.baseDirectory() method return should be valid")]
        public void StdSystemEnvironmentBaseDirectoryShouldBeValid()
        {
            var script = @"std.environment.baseDirectory()";
            var result = _engine.Evaluate(script).AsString();

            Assert.NotEmpty(result);
        }
    }
}
