using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Entities;
using MelonRuntime.Core.Extensions;
using System;
using MelonRuntime.Core;

namespace MelonRuntime.JavaScriptTests
{
    
    public static class MelonGenerator
    {
        public static IMelon<JsValue> Get()
        {
            var assembliesToCache = AppDomain.CurrentDomain.GetAssemblies();
            Static.CachedAssemblies = assembliesToCache;
            
            DependencyRunner.Setup();

            var runtime = new Melon();
            return runtime.WithCoreFeatures(new Version());
        }
    }
}