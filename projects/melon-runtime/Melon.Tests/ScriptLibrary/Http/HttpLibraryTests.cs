using Melon.Engine.Builder;
using System.Collections.Generic;

namespace Melon.Tests.ScriptLibrary.Http
{
    public class HttpLibraryTests
    {
        private readonly Jint.Engine _engine;

        public HttpLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Http/http"
            };

            loadList.ForEach(x => builder.Load(x));
            _engine = builder.Build();
        }
    }
}
