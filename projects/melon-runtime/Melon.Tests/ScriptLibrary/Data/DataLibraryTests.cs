using Jint;
using Melon.Engine.Builders;
using System.Collections.Generic;
using Xunit;

namespace Melon.Tests.ScriptLibrary.Data
{
    public class DataLibraryTests
    {
        private readonly Jint.Engine engine;

        public DataLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Dotnet/dotnet",
                "Standard/Version",
                "Standard/std",
                "Data/data"
            };

            loadList.ForEach(x => builder.Load(x));
            engine = builder.Build();
        }

        [Fact(DisplayName = "'data' clone() method should work correctly")]
        public void DataCloneMethodShouldWorkCorrectly()
        {
            var script = @"
                let a = 1; 
                let b = data.clone(1); 
                b;
            ";
            var result = engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "'data' compare() method should work correctly")]
        public void DataCompareMethodShouldWorkCorrectly()
        {
            var script = @"
                let a = 1; 
                let b = 1; 
                JSON.stringify(data.compare(a, b));
            ";
            var result = engine.Evaluate(script).AsString();

            Assert.Equal("{\"comments\":\"\",\"equals\":true}", result);
        }
    }
}
