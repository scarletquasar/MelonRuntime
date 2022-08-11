using Jint;
using Melon.Engine.Builders;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Melon.Static.Runtime;

namespace Melon.Tests.ScriptLibrary.Standards
{
    public class StdLibraryTests
    {
        private readonly Jint.Engine engine;

        public StdLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Dotnet/dotnet",
                "Standard/Version",
                "Standard/std"
            };

            loadList.ForEach(x => builder.Load(x));

            engine = builder.Build();
            Runtime.Engine = builder.Build();
        }

        [Fact(DisplayName = "'std' shift() method should work correctly")]
        public void StdShiftMethodShouldWorkCorrectly()
        {
            var script = @"
                let a;
                std.shift(1).option(1, (x) => a = x);
                a;
            ";
            var result = engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "'std' system.osInformation should be valid")]
        public void StdSystemOsInformationShouldHaveCorrectData()
        {
            var script = @"std.system.osInformation";
            var result = engine.Evaluate(script).AsObject();

            Assert.Equal(((double)Environment.OSVersion.Platform), result.Get("platform"));
            Assert.Equal(Environment.OSVersion.VersionString, result.Get("version"));
            Assert.Equal(Environment.OSVersion.ServicePack, result.Get("servicePack"));
        }

        [Fact(DisplayName = "'std' system.environment.baseDirectory should be valid")]
        public void StdEnvironmentCurrentDirectoryShouldBeValid()
        {
            var script = @"std.environment.baseDirectory";
            var result = engine.Evaluate(script).AsString();

            Assert.NotEmpty(result);
        }

        [Fact(DisplayName = "'std' system.environment.getEnvironmentVariables() method return should be valid")]
        public void StdEnvironmentGetEnvironmentVariablesShouldBeValid()
        {
            var script = @"
                std.environment.setEnvironmentVariable('test', 123);
                Object.keys(std.environment.getEnvironmentVariables()).length;
            ";
            var result = engine.Evaluate(script).AsNumber();

            Assert.NotEqual((uint)0, (uint)result);
        }

        [Fact(DisplayName = "'std' system.environment.setEnvironmentVariable() method return should be valid")]
        public void StdEnvironmentSetEnvironmentVariableShouldBeValid()
        {
            var script = @"
                std.environment.setEnvironmentVariable('test', 123);
                std.environment.getEnvironmentVariables()['test'];
            ";
            var result = engine.Evaluate(script).AsNumber();

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
            var result = engine.Evaluate(script).AsNumber();

            Assert.Equal((uint)0, (uint)result);
        }

        [Fact(DisplayName = "'std' system.process.argv should be a valid array")]
        public void StdProcessArgvShouldveAValidArray()
        {
            var script = @"
                Array.isArray(std.process.argv);
            ";
            var result = engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'std' system.process.env should be a valid object")]
        public void StdProcessEnvShouldveAValidObject()
        {
            var script = @"
                std.process.env instanceof Object;
            ";
            var result = engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'std' time.setTimeout should work correctly")]
        public async void StdTimeSetTimeoutShouldWorkCorrectly()
        {
            var callerScript = @"
                let setTimeoutTarget = 1;
                std.time.setTimeout(() => setTimeoutTarget = 2, 1000);
            ";

            Runtime.Engine!.Execute(callerScript);

            await Task.Delay(2000);

            var script = @"
                setTimeoutTarget;
            ";
            var result = Runtime.Engine!.Evaluate(script).AsNumber();

            Assert.Equal(2, result);
        }

        [Fact(DisplayName = "'std' time.setInterval should work correctly")]
        public async void StdTimeSetIntervalShouldWorkCorrectly()
        {
            var callerScript = @"
                let setIntervalTarget = 1;
                std.time.setInterval(() => setIntervalTarget++, 1000);
            ";

            Runtime.Engine!.Execute(callerScript);

            await Task.Delay(1500);

            var script = @"
                setIntervalTarget;
            ";
            var result = Runtime.Engine!.Evaluate(script).AsNumber();

            Assert.Equal(3, result);
        }
    }
}