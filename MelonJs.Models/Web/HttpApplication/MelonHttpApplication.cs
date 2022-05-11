namespace MelonJs.Models.Web.HttpApplication
{
    public class MelonHttpApplication
    {
        public MelonHttpApplication(string host, int port, List<HttpRoute> routes, List<HttpEcho> echoes, bool enableHttps = true)
        {
            Routes = routes;
            Echoes = echoes;
            Host = host;
            Port = port;
            EnableHttps = enableHttps;
        }

        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableHttps { get; set; }
        public List<HttpRoute> Routes { get; set; }
        public List<HttpEcho> Echoes { get; set; }
    }
}