using System.Text.Json.Serialization;

namespace Melon.Web.Models
{
    public class HttpRoute
    {
        [JsonPropertyName("method")]
        public string? Method { get; set; }

        [JsonPropertyName("route")]
        public string? Route { get; set; }
    }
}
