using Melon.Static.Runtime;

namespace Melon.Library.Static.Generic
{
    public static class Time
    {
        private const string stdSubmodule = "std.time._timers";
        private const string stdTargetAction = "callback()";

        public static void SetTimeout(int identifier, int delay)
        {
            Task.Run(async () =>
            {
                await Task.Delay(delay);
                Runtime.Engine?.Execute($"{stdSubmodule}[{identifier}].{stdTargetAction}");
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
                        Runtime.Engine?.Execute($"{stdSubmodule}[{identifier}].{stdTargetAction}");
                        await timer.WaitForNextTickAsync();
                    }
                }
            });
        }
    }
}