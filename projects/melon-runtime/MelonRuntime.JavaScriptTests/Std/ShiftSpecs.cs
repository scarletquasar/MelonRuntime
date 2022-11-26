using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using Xunit;

namespace MelonRuntime.JavaScriptTests.Std
{
    public class ShiftSpecs
    {
        private readonly IMelon<JsValue> _melon;

        public ShiftSpecs()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void StdShiftShouldWorkCorrectlyWithOneTrueOption()
        {
            var script = @"
                const { shift } = Melon.std;
                let result = 0;
                shift().option(1 === 1, () => result = 1);
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact]
        public void StdShiftShouldWorkCorrectlyWithOneFalseOption()
        {
            var script = @"
                const { shift } = Melon.std;
                let result = 0;
                shift().option(1 === 2, () => result = 1);
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(0, result);
        }

        [Fact]
        public void StdShiftShouldWorkCorrectlyWithMultipleTrueOptions()
        {
            var script = @"
                const { shift } = Melon.std;
                let result = 0;
                shift()
                    .option(1 === 1, () => result = 1)
                    .option(0 === 0, () => result = 2)
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(2, result);
        }

        [Fact]
        public void StdShiftShouldWorkCorrectlyWithMultipleFalseOptions()
        {
            var script = @"
                const { shift } = Melon.std;
                let result = 0;
                shift()
                    .option(1 !== 1, () => result = 1)
                    .option(0 !== 0, () => result = 2)
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(0, result);
        }

        [Fact]
        public void StdShiftShouldWorkCorrectlyWithMultipleMiscOptions()
        {
            var script = @"
                const { shift } = Melon.std;
                let result = 0;
                shift()
                    .option(1 !== 1, () => result = 1)
                    .option(0 === 0, () => result = 2)
                    .option(1 === 1, () => result = 3)
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(3, result);
        }
    }
}