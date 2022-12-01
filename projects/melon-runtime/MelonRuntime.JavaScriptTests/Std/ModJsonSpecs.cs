using Xunit;
using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;

namespace MelonRuntime.JavaScriptTests.Std
{
    public class ModJsonSpecs
    {
        private readonly IMelon<JsValue> _melon;

        public ModJsonSpecs()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void JsonTryParseShouldWorkCorrectlyForAllNormalPrimitives()
        {
            var jsonValue =
                "{\"string\":\"a\",\"number\":\"1\",\"objectArray\":[],\"objectObject\":{},\"boolean\":true}";

            var script = @$"
                const jsonValue = '{jsonValue}';

                const parsed = Melon.std.json.tryParse(jsonValue);
                const stringified = JSON.stringify(parsed);

                stringified
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsString();

            Assert.Equal(jsonValue, result);
        }

        [Fact]
        public void JsonTryStringifyShouldWorkCorrectlyForAllNormalPrimitives()
        {
            var jsonValue =
                "{\"string\":\"a\",\"number\":\"1\",\"objectArray\":[],\"objectObject\":{},\"boolean\":true}";

            var script = @$"
                const jsonValue = '{jsonValue}';

                const parsed = Melon.std.json.tryParse(jsonValue);
                const stringified = Melon.std.json.tryStringify(parsed);

                stringified
            ";

            var result = _melon.EvaluateInstructionsDirectly(script).AsString();

            Assert.Equal(jsonValue, result);
        }
    }
}
