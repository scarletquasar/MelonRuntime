using Jint;
using Melon.Engine.Builders;
using Melon.Static.Runtime;
using Xunit;

namespace Melon.Tests.Melon.dotnet
{
    public class DotnetThreadingTests
    {
        private readonly Jint.Engine _engine;

        public DotnetThreadingTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact]
        public void CreateTaskShouldWorkCorrectly()
        {
            Runtime.Engine = _engine;

            var script = @"
                const task = Melon.dotnet.threading.createTask(() => 1);
                task.start();
                task.wait();
                task.result;
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);

            Runtime.Engine = null;
        }

        [Fact]
        public void TaskConstructorShouldWorkCorrectly()
        {
            Runtime.Engine = _engine;

            var script = @"
                const taskConstructor = new Melon.dotnet.threading.Task(() => 1);
                taskConstructor.start();
                taskConstructor.wait();
                taskConstructor.result;
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);

            Runtime.Engine = null;
        }

        [Fact]
        public void CreateThreadShouldWorkCorrectly()
        {
            Runtime.Engine = _engine;

            var script = @"
                let value = 0;
                const thread = Melon.dotnet.threading.createThread(() => value = 1);
                thread.start();
                
                while(value != 1) { }
                value
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);

            Runtime.Engine = null;
        }

        [Fact]
        public void ThreadConstructorShouldWorkCorrectly()
        {
            Runtime.Engine = _engine;

            var script = @"
                let value = 0;
                const thread = new Melon.dotnet.threading.Thread(() => value = 1);
                thread.start();
                
                while(value != 1) { }
                value
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);

            Runtime.Engine = null;
        }
    }
}
