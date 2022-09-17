using System.Text.Json.Serialization;

namespace Melon.Web.Models
{
    public class HttpEcho
    {
        [JsonPropertyName("host")]
        public string? Host { get; set; }

        [JsonPropertyName("port")]
        public int Port { get; set; }

        public HttpEcho() { }

        public HttpEcho(string host, int port)
        {
            Host = host;
            Port = port;
        }
    }
}
