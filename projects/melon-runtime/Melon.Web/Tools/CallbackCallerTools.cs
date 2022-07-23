using Melon.Web.Properties;

namespace Melon.Web.Tools
{
    public static class CallbackCallerTools
    {
        internal static string GetCallbackCaller(
            string appIdentifier,
            string method,
            string route,
            string serializedQuery = "{}",
            string serializedHeaders = "{}",
            string serializedBody = "{}")
        {
            var result = Resources.RouteCallbackCaller
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