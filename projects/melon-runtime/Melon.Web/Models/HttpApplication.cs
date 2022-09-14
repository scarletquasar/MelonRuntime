namespace Melon.Web.Models
{
    public class HttpApplication
    {
        public HttpApplication(
            string name, 
            string host, 
            int port, 
            List<HttpEndpoint> routes, 
            List<HttpEcho> echoes, 
            bool enableHttps = true)
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
        public List<HttpEndpoint> Routes { get; set; }
        public List<HttpEcho> Echoes { get; set; }
    }
}
