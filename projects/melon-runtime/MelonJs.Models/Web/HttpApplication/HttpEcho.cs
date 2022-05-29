using System.Text.Json.Serialization;

namespace MelonJs.Models.Web.HttpApplication
{
    public class HttpEcho
    {
        [JsonPropertyName("host")]
        public string? Host { get; set; }

        [JsonPropertyName("port")]
        public int Port { get; set; }
    }
}
