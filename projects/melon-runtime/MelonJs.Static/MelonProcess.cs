using System.Diagnostics;

namespace MelonJs.Static
{
    public static class MelonProcess
    {
        public static long GetMemoryUsage()
        {
            Process currentProc = Process.GetCurrentProcess();
            return currentProc.PrivateMemorySize64;
        }

        public static void Kill(string name = "this", bool entireProcessTree = false)
        {
            if(name != "this")
            {
                Process[] workers = Process.GetProcessesByName(name);
                foreach (Process worker in workers)
                {
                    worker.Kill(entireProcessTree);
                    worker.WaitForExit();
                    worker.Dispose();
                }
                return;
            }

            Process.GetCurrentProcess().Kill(entireProcessTree);
        }

        public static string GetPlatform()
        {
            return Environment.OSVersion.Platform.ToString();
        }

        public static string SetTitle(string title)
        {
            Console.Title = title;
            return title;
        }

        public static string GetCurrentTime(bool utc = false)
        {
            return utc ? DateTime.UtcNow.ToString() : DateTime.Now.ToString();
        }
    }
}
