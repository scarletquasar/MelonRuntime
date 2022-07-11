namespace Melon.Web.Tools
{
    public static class CallbackCallerTools
    {
        internal static string GetCallbackCaller(
            string appIdentifier,
            string method,
            string route,
            string? serializedQuery = null,
            string? serializedHeaders = null,
            string? serializedBody = null)
        {
            var result = $"(http._apps['{appIdentifier}']";
            result += $".routes.filter(x => x.method === '{method}'";
            result += $" && x.route === '{route}')[0].callback)";

            switch (method)
            {
                case "GET":
                    result += $"('{serializedQuery}', '{serializedHeaders}')";
                    break;

                case "POST":
                    result += $"('{serializedBody}', '{serializedQuery}', '{serializedHeaders}')";
                    break;

                case "DELETE":
                    result += $"('{serializedBody}', '{serializedQuery}', '{serializedHeaders}')";
                    break;
            }

            return result;
        }
    }
}