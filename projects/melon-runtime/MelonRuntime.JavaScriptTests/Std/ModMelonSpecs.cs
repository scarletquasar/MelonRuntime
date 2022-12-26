using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using Xunit;

namespace MelonRuntime.JavaScriptTests.Std
{
    public class ModMelonSpecs
    {
        private readonly IMelon<JsValue> _melon;

        public ModMelonSpecs()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void CurrentVersionShouldHaveAValidValue()
        {
            var script = @"
                Melon.std.melon.currentVersion.toString()
            ";

            var result = _melon.EvaluateInstructions(script).AsString();

            Assert.NotEqual("0.0.0", result);
            Assert.Equal(3, result.Split(".").Length);
        }
    }
}
