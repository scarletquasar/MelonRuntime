using Jint;
using Jint.Native;

namespace MelonJs.WebApps.Tools
{
    public static class HttpResultTools
    {
        internal static IResult GetHttpResult(JsValue obj)
        {
            var httpResult = obj.AsObject();

            return (double)httpResult.Get("status").AsNumber() switch
            {
                200 => GetSpecificResult(httpResult),
                404 => Results.NotFound(httpResult.Get("response").AsString()),
                401 => Results.Unauthorized(),
                400 => Results.BadRequest(httpResult.Get("response").AsString()),
                409 => Results.Conflict(httpResult.Get("response").AsString()),
                204 => Results.NoContent(),
                422 => Results.UnprocessableEntity(httpResult.Get("response").AsString()),
                _ => Results.Problem(httpResult.Get("response").AsString(),
                    statusCode: Convert.ToInt32(httpResult.Get("status").AsNumber()))
            };
        }

        internal static IResult GetSpecificResult(JsValue httpResult)
        {
            var type = httpResult.Get("type").AsString();
            var response = httpResult.Get("response").AsString();
            return type switch
            {
                "text/plain" => Results.Content(response, type),
                "application/json" => Results.Ok(response),
                _ => Results.Content(response, type),
            };
        }
    }
}
