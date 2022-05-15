namespace MelonJs.Static.Tools.Scripting
{
    public static class MelonEnvironment
    {
        public static Dictionary<string, string> GetEnvironmentVariables()
        {
            return (Dictionary<string, string>)System.Environment.GetEnvironmentVariables();
        }
    }
}
