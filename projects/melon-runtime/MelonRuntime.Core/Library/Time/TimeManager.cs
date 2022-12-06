using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;

namespace MelonRuntime.Core.Library.Time
{
    public static class TimeManager
    {
        public static void DefineTimeoutOf(IMelon<JsValue> melon, string targetName, int delay)
        {
            var timerIdentifier = $"Melon.std.time._timers['{targetName}']";

            Task.Factory.StartNew(async () => 
            {
                await Task.Delay(delay);

                var isActive = melon
                    .EvaluateInstructionsDirectly($"{timerIdentifier}.active")
                    .AsBoolean();

                if(isActive)
                {
                    melon.SendInstructions($"{timerIdentifier}.callback()");
                }
                
                return;
            });
        }

        public static void DefineIntervalOf(IMelon<JsValue> melon, string targetName, int delay)
        {
            var timerIdentifier = $"Melon.std.time._timers['{targetName}']";

            Task.Factory.StartNew(async () =>
            {
                while (true)
                {
                    var isActive = melon
                        .EvaluateInstructionsDirectly($"{timerIdentifier}.active")
                        .AsBoolean();

                    if (!isActive) 
                    {
                        break;
                    }

                    await Task.Delay(delay);
                    melon.SendInstructions($"Melon.std.time._timers['{targetName}'].callback()");
                }
            });
        }
    }
}
