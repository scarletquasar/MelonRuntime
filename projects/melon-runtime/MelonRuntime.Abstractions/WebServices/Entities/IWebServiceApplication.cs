namespace MelonRuntime.Abstractions.WebServices.Entities
{
    public interface IWebServiceApplication<IMelon>
    {

        public void AddEndpoints(IWebServiceApplicationEndpoint<IMelon>[] endpoints);
        public void AddEchoes(IWebServiceApplicationEcho[] echoes);
        public string GetHost();
        public int GetPort();
        public bool IsHttpsEnabled();
        public void Run();
    }
}
