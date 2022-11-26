using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.JavaScript;
using MelonRuntime.Core.Entities;
using MelonRuntime.CLI.Extensions;
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

            IJavaScriptEngine<JsValue> engineProvider = new JintProvider();
            IMelon<JsValue> runtime = new Melon(engineProvider);

            return runtime.WithCoreFeatures(new Version());
        }
    }
}