using Jint;
using Jint.Native;
using System.Text.Json;

namespace Melon.Web.Tools
{
    public static class HttpResultTools
    {
        internal static object GetHttpResult(JsValue obj)
        {
            var httpResult = obj.AsObject();

            var headers = JsonSerializer.Deserialize<Dictionary<string, object>>(
                httpResult.Get("headers").AsString()
            );

            var response = httpResult.Get("response").AsString();
            var status = httpResult.Get("status").AsNumber();

            var type = Convert.ToString(headers!["Content-Type"])!;

            return status switch
            {
                200 => GetSpecificResult(type, response),
                404 => Results.NotFound(response),
                401 => Results.Unauthorized(),
                400 => Results.Json(JsonSerializer.Deserialize<object>(response), statusCode: 400),
                409 => Results.Conflict(response),
                204 => Results.NoContent(),
                422 => Results.UnprocessableEntity(response),
                _
                    => Results.Problem(
                        httpResult.Get("response").AsString(),
                        statusCode: Convert.ToInt32(httpResult.Get("status").AsNumber())
                    )
            };
        }

        internal static object GetSpecificResult(string type, string response)
        {
            return type switch
            {
                "text/plain" => Results.Content(response, type),
                "application/json" => response,
                _ => Results.Content(response, type),
            };
        }

        internal static Dictionary<string, dynamic> GetHttpHeaders(JsValue obj)
        {
            if(obj != null)
            {
                var headers = obj.Get("headers") == JsValue.Undefined ? "{}" : obj.Get("headers").AsString();
                var result = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(headers)!;

                return result;
            }

            return new();
        }
    }
}
