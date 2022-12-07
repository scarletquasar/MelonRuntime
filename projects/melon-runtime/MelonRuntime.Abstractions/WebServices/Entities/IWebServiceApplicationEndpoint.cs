using Microsoft.AspNetCore.Http;

namespace MelonRuntime.Abstractions.WebServices.Entities
{
    public interface IWebServiceApplicationEndpoint<IMelon>
    {
        public HttpMethod GetMethod();
        public string GetPath();
        public Task<object?> Resolve(HttpRequest request);
    }
}
