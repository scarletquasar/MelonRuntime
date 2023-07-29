using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Entities;
using MelonRuntime.Core.Extensions;
using System;
using MelonRuntime.Core;
using static MelonRuntime.Core.DependencyRunner;

namespace MelonRuntime.JavaScriptTests
{
    public static class MelonGenerator
    {
        public static IMelon<JsValue> Get()
        {
            var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
            Static.CachedAssemblies = assembliesToCache;
            
            LoadRequiredAssemblies();

            var runtime = new Melon().WithCoreFeatures(new Version());
                
            return runtime;
        }
    }
}