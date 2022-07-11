namespace Melon.Web.Models
{
    public class HttpApplication
    {
        public HttpApplication(string name, string host, int port, List<HttpRoute> routes, List<HttpEcho> echoes, bool enableHttps = true)
        {
            Name = name;
            Routes = routes;
            Echoes = echoes;
            Host = host;
            Port = port;
            EnableHttps = enableHttps;
        }

        public string Name { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableHttps { get; set; }
        public List<HttpRoute> Routes { get; set; }
        public List<HttpEcho> Echoes { get; set; }
    }
}
