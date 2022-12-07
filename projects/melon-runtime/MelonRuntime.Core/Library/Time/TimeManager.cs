using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;

namespace MelonRuntime.Core.Library.Time
{
    public static class TimeManager
    {
        public static void DefineTimeoutOf(IMelon<JsValue> melon, string targetName, int delay)
        {
            DefineIntervalOf(melon, targetName, delay, true);
        }

        public static void DefineIntervalOf(IMelon<JsValue> melon, string targetName, int delay, bool oneTime = false)
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

                    if(oneTime)
                    {
                        break;
                    }
                }
            });
        }
    }
}
