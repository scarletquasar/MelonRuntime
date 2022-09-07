using System.Text.Json.Serialization;

namespace Melon.Web.Models
{
    public class HttpEndpoint
    {
        [JsonPropertyName("method")]
        public string? Method { get; set; }

        [JsonPropertyName("route")]
        public string? Route { get; set; }

        public HttpEndpoint() { }
        public HttpEndpoint(string method, string route)
        {
            Method = method;
            Route = route;
        }
    }
}
