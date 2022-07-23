using Melon.Static.Runtime;

namespace Melon.Library.Static.Generic
{
    public static class Time
    {
        public static void SetTimeout(int identifier, int delay)
        {
            Task.Run(async () =>
            {
                await Task.Delay(delay);
                Runtime.Engine?.Execute($"std.time._timers[{identifier}].callback()");
            });
        }

        public static void SetInterval(int identifier, int delay)
        {
            Task.Run(async () => {
                while (true)
                {
                    using var timer = new PeriodicTimer(TimeSpan.FromMilliseconds(delay));
                    while (true)
                    {
                        Runtime.Engine?.Execute($"std.time._timers[{identifier}].callback()");
                        await timer.WaitForNextTickAsync();
                    }
                }
            });
        }
    }
}