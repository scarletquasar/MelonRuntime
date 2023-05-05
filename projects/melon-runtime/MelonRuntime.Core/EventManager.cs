using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Entities;

namespace MelonRuntime.Core
{
    public static class EventManager
    {
        public static void CreateEvent(string name, Event target, IMelon<JsValue> melon)
        {
            lock (melon.GetEvents())
            {
                melon.GetEvents().Add(name, target);
            }
        }

        public static void DeleteEvent(string name, int delay, IMelon<JsValue> melon)
        {
            lock (melon.GetEvents())
            {
                if (delay > 0)
                {
                    Task.Run(async () =>
                    {
                        await Task.Delay(delay);
                        melon.GetEvents().Remove(name);
                    });

                    return;
                }


                melon.GetEvents().Remove(name);
            }
        }

        public static async Task RunEvent(string name, IMelon<JsValue> melon)
        {
            var target = (Event)melon.GetEvents()[name];
            await target.Run();
        }

        public static void SetEventPausedState(string name, bool state, IMelon<JsValue> melon)
        {
            var target = (Event)melon.GetEvents()[name];
            target.Paused = state;
        }

        public static void FinishEvent(string name, IMelon<JsValue> melon)
        {
            var target = (Event)melon.GetEvents()[name];
            target.Finished = true;
        }
    }
}
