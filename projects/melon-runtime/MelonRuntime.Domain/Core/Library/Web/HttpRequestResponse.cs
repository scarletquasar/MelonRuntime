using System.Net.Http.Headers;

namespace MelonRuntime.Domain.Core.Library.Web
{
    public class HttpRequestResponse
    {
        public string? Body { get; set; }
        public HttpResponseHeaders? Headers { get; set; }
        public float? Latency { get; set; }
        public bool? Ok { get; set; }
        public int? StatusCode { get; set; }
    }
}