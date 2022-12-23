using Cli.NET.Tools;
using Jint.Native;
using Jint.Runtime;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Library;

namespace MelonRuntime.Core.Extensions
{
    public static class MelonExtensions
    {
        public static IMelon<JsValue> WithCoreFeatures(this IMelon<JsValue> runtime, Version version)
        {
            var bindingsManager = BindingsManager.GetManager(runtime);
            var bindings = bindingsManager.GetBindings();

            runtime.SetInteropValue("_$internalBinding", bindings);

            var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
            runtime.LoadFile(classlibPath + "/Scripts/core.js", false);

            var vStr = $"Melon.std.melon.currentVersion = new Melon.Version({version.Major}, {version.Minor}, {version.Build})";
            runtime.SendInstructions(vStr);

            return runtime;
        }

        public static IMelon<JsValue> WithConsoleErrors(this IMelon<JsValue> runtime) 
        {
            runtime.AddRuntimeErrorAction(obj =>
            {
                CLNConsole.Write(obj.GetType().Name, ConsoleColor.Red);
                Console.WriteLine();
                CLNConsole.Write($" > ", ConsoleColor.Red);
                Console.WriteLine(obj.Message);

                if (obj.GetType() == typeof(JavaScriptException))
                {
                    var dynamicException = (dynamic)obj;
                    var stackTraceLines = dynamicException.JavaScriptStackTrace.Split("\n");

                    foreach (var line in stackTraceLines)
                    {
                        CLNConsole.Write($" > ", ConsoleColor.Red);
                        Console.WriteLine(line.Trim());
                    }
                }
            });

            runtime.AddExternalErrorAction(obj =>
            {
                CLNConsole.Write(obj.GetType().Name, ConsoleColor.Red);
                CLNConsole.Write($" < ", ConsoleColor.Green);
                Console.WriteLine(obj.Message);
            });

            return runtime;
        }

        public static IMelon<JsValue> AddConsoleOutput(this IMelon<JsValue> runtime)
        {
            runtime.AddOutputAction(obj =>
            {
                var value = Convert.ToString(obj)!;
                var values = value.Split("\n").ToList();

                values.ForEach(value =>
                {
                    CLNConsole.Write($"< ", ConsoleColor.Green);
                    CLNConsole.WriteLine(value, ConsoleColor.DarkGray);
                });
            });

            return runtime;
        }
    }
}
