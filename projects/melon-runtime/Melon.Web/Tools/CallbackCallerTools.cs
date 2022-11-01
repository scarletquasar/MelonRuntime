using System.Reflection;

namespace Melon.Web.Tools
{
    public static class CallbackCallerTools
    {
        internal static async Task<string> GetCallbackCaller(
            string appIdentifier,
            string method,
            string route,
            string serializedQuery = "{}",
            string serializedHeaders = "{}",
            string serializedBody = "{}"
        )
        {
            var assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var scriptPath = assemblyPath! + "/Scripts/RouteCallbackCaller.js";
            var callbackCaller = await File.ReadAllTextAsync(scriptPath);

            var result = callbackCaller
                .Replace("{appIdentifier}", appIdentifier)
                .Replace("{method}", method)
                .Replace("{route}", route)
                .Replace("{serializedQuery}", serializedQuery)
                .Replace("{serializedBody}", serializedBody)
                .Replace("{serializedHeaders}", serializedHeaders);
            return result;
        }
    }
}
