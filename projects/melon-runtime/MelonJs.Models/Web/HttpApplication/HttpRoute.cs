using System.Text.Json.Serialization;

namespace MelonJs.Models.Web.HttpApplication
{
    public class HttpRoute
    {
        [JsonPropertyName("method")]
        public string? Method { get; set; }

        [JsonPropertyName("route")]
        public string? Route { get; set; }

        [JsonPropertyName("callback")]
        public string? Callback { get; set; }
    }
}