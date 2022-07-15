using Jint;
using Jint.Runtime;
using Melon.Engine.Builder;
using System;
using System.Collections.Generic;
using Xunit;

namespace Melon.Tests.Library.Data
{
    public class EnumerableConstructorTests
    {
        private readonly Jint.Engine _engine;

        public EnumerableConstructorTests()
        {
            var builder = new EngineBuilder();

            var loadList = new List<string>()
            {
                "Data/Enumerable",
                "Data/IndexedArray",
                "Data/data"
            };

            loadList.ForEach(x => builder.Load(x));
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Constructor Enumerable count should have the right value")]
        public void ConstructorEnumerableCountShouldHaveTheRightValue()
        {
            var script = "new Enumerable([1, 2, 3]).count";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(3, result);
        }

        [Fact(DisplayName = "Constructor Enumerable should block exceeding capacity")]
        public void ConstructorEnumerableShouldBlockExceedingCapacity()
        {
            var script = "new Enumerable([1, 2, 3], 2)";

            Assert.Throws<JavaScriptException>(() => _engine.Evaluate(script));
        }

        [Fact(DisplayName = "Constructor Enumerable add() method should work")]
        public void ConstructorEnumerableAddMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable(); 
                en.add(100); 
                en.toArray()[0];
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(100, result);
        }

        [Fact(DisplayName = "Constructor Enumerable addRange() method should work")]
        public void ConstructorEnumerableAddRangeMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable(); 
                en.addRange([100, 200]); 
                en.toArray().toString();
            ";

            var result = _engine.Evaluate(script).AsString();

            Assert.Equal("100,200", result);
        }

        [Fact(DisplayName = "Constructor Enumerable toArray() method should work")]
        public void ConstructorEnumerableToArrayMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable();  
                Array.isArray(en.toArray());
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Constructor Enumerable take() method should work")]
        public void ConstructorEnumerableTakeMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1, 2, 3]);  
                en.take(1).toArray().toString();
            ";

            var result = _engine.Evaluate(script).AsString();

            Assert.Equal("1", result);
        }

        [Fact(DisplayName = "Constructor Enumerable skip() method should work")]
        public void ConstructorEnumerableSkipMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1, 2, 3]);  
                en.skip(1).toArray().toString();
            ";

            var result = _engine.Evaluate(script).AsString();

            Assert.Equal("2,3", result);
        }

        [Fact(DisplayName = "Constructor Enumerable where() method should work")]
        public void ConstructorEnumerableWhereMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1, 2, 3]);  
                en.where(x => x === 3).toArray().toString();
            ";

            var result = _engine.Evaluate(script).AsString();

            Assert.Equal("3", result);
        }

        [Fact(DisplayName = "Constructor Enumerable firstOrDefault() method should work")]
        public void ConstructorEnumerableFirstOrDefaultMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.firstOrDefault();
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "Constructor Enumerable lastOrDefault() method should work")]
        public void ConstructorEnumerableLastOrDefaultMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.lastOrDefault();
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "Constructor Enumerable first() method should work")]
        public void ConstructorEnumerableFirstMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.first();
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "Constructor Enumerable last() method should work")]
        public void ConstructorEnumerableLastMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.last();
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact(DisplayName = "Constructor Enumerable any() method should work")]
        public void ConstructorEnumerableAnyMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.any();
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Constructor Enumerable all() method should work")]
        public void ConstructorEnumerableAllMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.all(x => x === 1);
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Constructor Enumerable average() method should return the correct value")]
        public void ConstructorEnumerableAverageMethodShouldReturnTheCorrectValue()
        {
            var script = @"
                let en = new Enumerable([0, 10]);  
                en.average();
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(5, result);
        }

        [Fact(DisplayName = "Constructor Enumerable cast() method should work")]
        public void ConstructorEnumerableCastMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable(['1']);  
                en = en.cast(Number);
                en.toArray()[0] instanceof Number;
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Constructor Enumerable equals() method should work")]
        public void ConstructorEnumerableEqualsMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.equals([1]);
            ";

            var result = _engine.Evaluate(script).AsBoolean();

            Assert.True(result);
        }

        [Fact(DisplayName = "Constructor Enumerable clear() method should work")]
        public void ConstructorEnumerableClearMethodShouldWork()
        {
            var script = @"
                let en = new Enumerable([1]);  
                en.clear();
                en.count
            ";

            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(0, result);
        }

        [Fact(DisplayName = "Constructor Enumerable should have the correct inputed elements")]
        public void ConstructorEnumerableShouldHaveTheCorrectElements()
        {
            var script = "new Enumerable([1, 2, 3]).toArray().toString()";
            var result = _engine.Evaluate(script).AsString();

            Assert.Equal("1,2,3", result);
        }
    }
}
