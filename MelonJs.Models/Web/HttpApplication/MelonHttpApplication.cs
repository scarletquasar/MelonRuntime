namespace MelonJs.Models.Web.HttpApplication
{
    public class MelonHttpApplication
    {
        public MelonHttpApplication(string host, uint port, List<HttpRoute> routes, bool enableHttps = true)
        {
            Routes = routes;
            Host = host;
            Port = port;
            EnableHttps = enableHttps;
        }

        public string Host { get; set; }
        public uint Port { get; set; }
        public bool EnableHttps { get; set; }
        public List<HttpRoute> Routes { get; set; }
    }
}