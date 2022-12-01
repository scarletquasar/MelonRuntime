using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using Xunit;

namespace MelonRuntime.JavaScriptTests.Std
{
    public class ModBooleanSpecs
    {
        private readonly IMelon<JsValue> _melon;

        public ModBooleanSpecs()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void BooleanCheckAllShouldWorkCorrectly()
        {
            var script = @"
                const { checkAll } = Melon.std.boolean;
                const condition = checkAll(x => x === true, [true, true, false]);
                condition;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsBoolean();

            Assert.False(result);
        }

        [Fact]
        public void BooleanCheckOneShouldWorkCorrectly()
        {
            var script = @"
                const { checkOne } = Melon.std.boolean;
                const condition = checkOne(x => x === true, [true, true, false]);
                condition;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsBoolean();

            Assert.True(result);
        }
    }
}
