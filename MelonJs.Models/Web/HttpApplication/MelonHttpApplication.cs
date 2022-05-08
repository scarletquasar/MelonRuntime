namespace MelonJs.Models.Web.HttpApplication
{
    public class MelonHttpApplication
    {
        public MelonHttpApplication(string host, int port, List<HttpRoute> routes, bool enableHttps = true)
        {
            Routes = routes;
            Host = host;
            Port = port;
            EnableHttps = enableHttps;
        }

        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableHttps { get; set; }
        public List<HttpRoute> Routes { get; set; }
    }
}