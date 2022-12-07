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
        public void SetIntervalShouldWorkCorrectly()
        {
            var script = @"
                let resultInterval = 0;
                let intervalId = setInterval(() => resultInterval++, 10);
                while(true) { if(resultInterval > 2) { break; } }
                clearInterval(intervalId);
                resultInterval;
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsNumber();

            Assert.Equal(3, result);
        }
    }
}
