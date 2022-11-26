using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using System;
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
        public void CurrentVersionShouldHaveTheCorrectValue()
        {

        }
    }
}
