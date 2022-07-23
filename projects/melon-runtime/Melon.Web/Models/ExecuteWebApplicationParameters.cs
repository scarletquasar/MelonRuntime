namespace Melon.Web.Models
{
    public class ExecuteWebApplicationParameters
    {
        public string? Name { get; set; }
        public string? Host { get; set; }
        public int Port { get; set; }
        public string? Routes { get; set; }
        public string? Echoes { get; set; }
        public bool EnableHttps { get; set; }
    }
}
