using Jint;
using Melon.Engine.Builders;
namespace Melon.Tests.Melon.http
{
    public class HttpAppTests
    {
        private readonly EngineBuilder _builder;

        public HttpAppTests()
        {
            _builder = new EngineBuilder();
            _builder.Load("Bundle/core");
        }
    }
}
