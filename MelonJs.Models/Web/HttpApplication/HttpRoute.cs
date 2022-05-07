namespace MelonJs.Models.Web.HttpApplication
{
    public class HttpRoute
    {
        public HttpRoute(string method, string path, string callback)
        {
            Method = method;
            Path = path;
            Callback = callback;
        }

        public string Method { get; set; }
        public string Path { get; set; }
        public string Callback { get; set; }
    }
}