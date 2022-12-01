namespace MelonRuntime.Abstractions.WebServices.Entities
{
    public interface IWebServiceApplicationEcho
    {
        public string GetHost();
        public int GetPort();
        public bool IsHttpsEnabled();
    }
}
