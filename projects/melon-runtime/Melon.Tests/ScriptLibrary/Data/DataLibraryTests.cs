using Jint;
using Melon.Engine.Builders;
using System.Collections.Generic;
using Xunit;

namespace Melon.Tests.ScriptLibrary.Data
{
    public class DataLibraryTests
    {
        private readonly Jint.Engine _engine;

        public DataLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Data/data"
            };

            loadList.ForEach(x => builder.Load(x));
            _engine = builder.Build();
        }

        [Fact(DisplayName = "'data' clone() method should work correctly")]
        public void DataCloneMethodShouldWorkCorrectly()
        {
            var script = @"
                let a = 1; 
                let b = data.clone(1); 
                b;
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "'data' compare() method should work correctly")]
        public void DataCompareMethodShouldWorkCorrectly()
        {
            var script = @"
                let a = 1; 
                let b = 1; 
                data.compare(a, b);
            ";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'data' find() method should work correctly")]
        public void DataFindMethodShouldWorkCorrectly()
        {
            var script = @"
                let a = 1; 
                let b = [1]; 
                data.find(a, b).found;
            ";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
