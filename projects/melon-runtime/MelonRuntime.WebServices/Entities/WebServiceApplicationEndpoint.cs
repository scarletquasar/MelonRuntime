using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.WebServices.Entities;
using MelonRuntime.WebServices.Properties;
using Newtonsoft.Json;

namespace MelonRuntime.WebServices.Entities
{
    public class WebServiceApplicationEndpoint : IWebServiceApplicationEndpoint<IMelon<JsValue>>
    {
        private readonly HttpMethod _httpMethod;
        private readonly string _path;
        private readonly string _appIdentifier;
        private readonly IMelon<JsValue> _melon;

        public WebServiceApplicationEndpoint(
            HttpMethod httpMethod, 
            string path, 
            string appIdentifier, 
            IMelon<JsValue> melon)
        {
            _httpMethod = httpMethod;
            _path = path;
            _appIdentifier = appIdentifier;
            _melon = melon;
        }

        public HttpMethod GetMethod()
        {
            return _httpMethod;
        }

        public string GetPath()
        {
            return _path;
        }

        public Task<object?> Resolve(HttpRequest request)
        {
            string identifier = Guid.NewGuid().ToString();

            if(_httpMethod.ToString() != request.Method)
                return Task.Run(() => (object?)Results.StatusCode(StatusCodes.Status405MethodNotAllowed));

            var identifierPromiseScript = $"Melon.http._apps['{_appIdentifier}']._promises['{identifier}']"; 
            _melon.SendInstructions(identifierPromiseScript + " = null");

            var query = request.Query.ToDictionary(
                x => x.Key,
                x => string.Join("", x.Value)
            );

            var headers = request.Headers.ToDictionary(
                x => x.Key,
                x => string.Join("", x.Value)
            );

            var routeValues = request.RouteValues.ToDictionary(
                x => x.Key,
                x => string.Join("", x.Value)
            );

            var stringQuery = JsonConvert.SerializeObject(query);
            var stringHeaders = JsonConvert.SerializeObject(headers);
            var stringBody = new StreamReader(request.Body).ReadToEndAsync().Result;
            var stringRouteValues = JsonConvert.SerializeObject(routeValues);

            var callerScript = Resources.CallbackCaller
                .Replace("{appIdentifier}", _appIdentifier)
                .Replace("{method}", request.Method)
                .Replace("{route}", _path)
                .Replace("{serializedQuery}", stringQuery)
                .Replace("{serializedBody}", stringBody)
                .Replace("{serializedHeaders}", stringHeaders.Replace("\n", ""))
                .Replace("{serializedRouteValues}", stringRouteValues)
                .Replace("{url}", request.Path);

            var promiseId = _melon.EvaluateInstructions(callerScript).AsString();

            var transaction = new WebTransaction($"Melon.http._apps['{_appIdentifier}']._promises['{promiseId}']", _melon);
            var task = Task.Factory.StartNew(() => transaction.ExecuteAndUnwrap());

            return task;
        }
    }
}
