using MelonRuntime.Abstractions.WebServices.Entities;

namespace MelonRuntime.WebServices.Entities
{
    public class WebServiceApplicationEcho : IWebServiceApplicationEcho
    {
        private readonly string _host;
        private readonly int _port;
        private readonly bool _isHttpsEnabled;

        public WebServiceApplicationEcho(string host, int port, bool isHttpsEnabled)
        {
            _host = host;
            _port = port;
            _isHttpsEnabled = isHttpsEnabled;
        }

        public string GetHost()
        {
            return _host;
        }

        public int GetPort()
        {
            return _port;
        }

        public bool IsHttpsEnabled()
        {
            return _isHttpsEnabled;
        }
    }
}
