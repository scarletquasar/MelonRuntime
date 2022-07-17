using Jint;
using Melon.Engine.Builders;
using System;
using System.Collections.Generic;
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
        public void StdEnvironmentCurrentDirectoryShouldBeValid()
        {
            var script = @"std.environment.currentDirectory()";
            var result = _engine.Evaluate(script).AsString();

            Assert.NotEmpty(result);
        }

        [Fact(DisplayName = "'std' system.environment.baseDirectory() method return should be valid")]
        public void StdEnvironmentBaseDirectoryShouldBeValid()
        {
            var script = @"std.environment.baseDirectory()";
            var result = _engine.Evaluate(script).AsString();

            Assert.NotEmpty(result);
        }

        [Fact(DisplayName = "'std' system.environment.getEnvironmentVariables() method return should be valid")]
        public void StdEnvironmentGetEnvironmentVariablesShouldBeValid()
        {
            var script = @"
                std.environment.setEnvironmentVariable('test', 123);
                Object.keys(std.environment.getEnvironmentVariables()).length;
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.NotEqual((uint)0, (uint)result);
        }

        [Fact(DisplayName = "'std' system.environment.setEnvironmentVariable() method return should be valid")]
        public void StdEnvironmentSetEnvironmentVariableShouldBeValid()
        {
            var script = @"
                std.environment.setEnvironmentVariable('test', 123);
                std.environment.getEnvironmentVariables()['test'];
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(123, result);
        }

        [Fact(DisplayName = "'std' system.environment.clearLocalEnvironmentVariables() method return should be valid")]
        public void StdEnvironmentClearLocalEnvironmentVariablesShouldBeValid()
        {
            var script = @"
                std.environment.setEnvironmentVariable('test', 123);
                std.environment.clearLocalEnvironmentVariables();
                Object.keys(std.environment.getEnvironmentVariables()).length;
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal((uint)0, (uint)result);
        }

        [Fact(DisplayName = "'std' system.process.argv should be a valid array")]
        public void StdProcessArgvShouldveAValidArray()
        {
            var script = @"
                Array.isArray(std.process.argv);
            ";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'std' system.process.env should be a valid object")]
        public void StdProcessEnvShouldveAValidObject()
        {
            var script = @"
                std.process.env instanceof Object;
            ";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}