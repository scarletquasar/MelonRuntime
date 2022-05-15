using System.Collections;

namespace MelonJs.Static.Tools.Scripting
{
    public static class MelonEnvironment
    {
        public static Dictionary<string, string> GetEnvironmentVariables()
        {
            var variables = Environment.GetEnvironmentVariables();
            var entries = variables.Cast<DictionaryEntry>() ?? new List<DictionaryEntry>();
            var result = entries
                         .ToDictionary(
                         item =>
                         {
                            var key = item.Key?.ToString() ?? "";
                            return key;
                         },
                         item => {
                            var value = item.Value?.ToString() ?? "";
                            return value;
                         });

            return result;
        }
    }
}
