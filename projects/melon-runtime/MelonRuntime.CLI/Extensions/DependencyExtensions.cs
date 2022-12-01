using Microsoft.Extensions.DependencyInjection;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.JavaScript;
using MelonRuntime.Core.Entities;

namespace MelonRuntime.CLI
{
    public static class DependencyExtensions
    {
        public static void AddMelonRuntime(this IServiceCollection dependencies)
        {
            dependencies.AddSingleton<IJavaScriptEngine<JsValue>, JintProvider>();
            dependencies.AddSingleton<IMelon<JsValue>, Melon>();
        }
    }
}
