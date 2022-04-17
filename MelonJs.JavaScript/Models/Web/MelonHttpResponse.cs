using System.Net.Http.Headers;

namespace MelonJs.JavaScript.Models.Web
{
    public class MelonHttpResponse
    {
        public string? Response { get; set; }
        public HttpResponseHeaders? Headers { get; set; }
    }
}
