using MelonRuntime.Abstractions.WebServices.Enums;

namespace MelonRuntime.Abstractions.WebServices.Entities
{
    public interface IWebTransaction
    {
        public WebTransactionStatus GetCurrentStatus();
        public void SetStatus(WebTransactionStatus status);
        public object? ExecuteAndUnwrap();
    }
}