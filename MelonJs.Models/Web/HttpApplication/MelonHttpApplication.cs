namespace MelonJs.Models.Web.HttpApplication
{
    public class MelonHttpApplication
    {
        public MelonHttpApplication(string host, uint port, HttpRouteList routes)
        {
            Routes = routes;
            Host = host;
            Port = port;
        }

        public string Host { get; set; }
        public uint Port { get; set; }
        public HttpRouteList Routes { get; set; }
    }
}
