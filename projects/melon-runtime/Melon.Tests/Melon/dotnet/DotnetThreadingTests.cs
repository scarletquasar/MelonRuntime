using Jint;
using Melon.Engine.Builders;
using Melon.Static.Runtime;
using System.Threading.Tasks;
using Xunit;

namespace Melon.Tests.Melon.dotnet
{
    public class DotnetThreadingTests
    {
        private readonly EngineBuilder _builder;

        public DotnetThreadingTests()
        {
            _builder = new EngineBuilder();
            _builder.Load("Bundle/core");
        }

        [Fact]
        public void CreateTaskShouldWorkCorrectly()
        {
            Runtime.Engine = _builder.Build();

            lock(Runtime.Engine) 
            {
                var script = @"
                    const task = Melon.dotnet.threading.createTask(() => 1);
                    task.start();
                    task.wait();
                    task.result;
                ";

                var result = Runtime.Engine.Evaluate(script).AsNumber();

                Assert.Equal(1, result);
            }

            Runtime.Engine = null;
        }

        [Fact]
        public void TaskConstructorShouldWorkCorrectly()
        {
            Runtime.Engine = _builder.Build();
            lock(Runtime.Engine) 
            {
                var script = @"
                    const taskConstructor = new Melon.dotnet.threading.Task(() => 1);
                    taskConstructor.start();
                    taskConstructor.wait();
                    taskConstructor.result;
                ";

                var result = Runtime.Engine.Evaluate(script).AsNumber();

                Assert.Equal(1, result);

                Runtime.Engine = null;
            }
        }

        [Fact]
        public void CreateThreadShouldWorkCorrectly()
        {
            Runtime.Engine = _builder.Build();

            lock (Runtime.Engine)
            {
                var script = @"
                    let value = 0;
                    const thread = Melon.dotnet.threading.createThread(() => value = 1);
                    thread.start();
                
                    while(value != 1) { }
                    value
                ";

                var result = Runtime.Engine.Evaluate(script).AsNumber();
                Assert.Equal(1, result);
                Runtime.Engine = null;
            }
        }

        [Fact]
        public void ThreadConstructorShouldWorkCorrectly()
        {
            Runtime.Engine = _builder.Build();
            lock (Runtime.Engine)
            {
                var script = @"
                    let value = 0;
                    const thread = new Melon.dotnet.threading.Thread(() => value = 1);
                    thread.start();
                
                    while(value != 1) { }
                    value
                ";

                var result = Runtime.Engine.Evaluate(script).AsNumber();
                Assert.Equal(1, result);
                Runtime.Engine = null;
            }
        }
    }
}
