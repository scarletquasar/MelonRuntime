using Jint;
using Melon.Engine.Builder;
using System.Collections.Generic;
using Xunit;

namespace Melon.Tests.ScriptLibrary.Standards
{
    public class GuardsLibraryTests
    {
        private readonly Jint.Engine _engine;

        public GuardsLibraryTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Standard/guards"
            };

            loadList.ForEach(x => builder.Load(x));
            _engine = builder.Build();
        }

        [Fact(DisplayName = "'guards.number' isEven() method should work correctly")]
        public void GuardsIsEvenMethodShouldWorkCorrectly()
        {
            var script = @"guards.number.isEven(2)";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.number' isOdd() method should work correctly")]
        public void GuardsIsOddMethodShouldWorkCorrectly()
        {
            var script = @"guards.number.isOdd(1)";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.number' isInteger() method should work correctly")]
        public void GuardsIsIntegerMethodShouldWorkCorrectly()
        {
            var script = @"guards.number.isInteger(1)";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.number' isFloat() method should work correctly")]
        public void GuardsIsFloatMethodShouldWorkCorrectly()
        {
            var script = @"guards.number.isFloat(1.5)";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.iterable' isEmptyArray() method should work correctly")]
        public void GuardsIsEmptyArrayMethodShouldWorkCorrectly()
        {
            var script = @"guards.iterable.isEmptyArray([])";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.iterable' isEmptyObject() method should work correctly")]
        public void GuardsIsEmptyObjectMethodShouldWorkCorrectly()
        {
            var script = @"guards.iterable.isEmptyObject({})";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.string' isNullOrEmpty() method should work correctly")]
        public void GuardsIsNullOrEmptyMethodShouldWorkCorrectly()
        {
            var script = @"guards.string.isNullOrEmpty('');";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "'guards.string' isNullOrWhiteSpace() method should work correctly")]
        public void GuardsIsNullOrWhiteSpaceMethodShouldWorkCorrectly()
        {
            var script = @"guards.string.isNullOrWhiteSpace('');";
            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }
    }
}
