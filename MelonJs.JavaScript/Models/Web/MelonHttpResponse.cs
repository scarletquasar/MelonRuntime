using System.Net.Http.Headers;

namespace MelonJs.JavaScript.Models.Web
{
    public class MelonHttpResponse
    {
        public string? Body { get; set; }
        public HttpResponseHeaders? Headers { get; set; }
        public float? Latency { get; set; }
        public bool Ok { get; set; }
        public uint StatusCode { get; set; }
    }
}
