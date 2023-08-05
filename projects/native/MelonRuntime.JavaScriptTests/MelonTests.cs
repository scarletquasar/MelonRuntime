using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Extensions;
using Xunit;

namespace MelonRuntime.JavaScriptTests
{
    public class MelonTests
    {
        private readonly IMelon<JsValue> _melon;

        public MelonTests()
        {
            _melon = MelonGenerator.Get();
        }

        [Fact]
        public void ShouldRunTestsCorrectly()
        {
            _melon.ExecuteTests();
        }
    }
}