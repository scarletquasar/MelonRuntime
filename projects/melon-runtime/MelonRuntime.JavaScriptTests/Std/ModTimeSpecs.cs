using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using Xunit;

namespace MelonRuntime.JavaScriptTests.Std
{
    public class ModTimeSpecs
    {
        private readonly IMelon<JsValue> _melon;

        public ModTimeSpecs()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void SetTimeoutShouldWorkCorrectly()
        {
            var script = @"
                let result = 0;
                setTimeout(() => result++, 10);
                while(true) { if(result > 0) { break; } }
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(1, result);
        }

        [Fact]
        public void SetIntervalShouldWorkCorrectly()
        {
            var script = @"
                let result = 0;
                setInterval(() => result++, 10);
                while(true) { if(result > 1) { break; } }
                result;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(2, result);
        }
    }
}
