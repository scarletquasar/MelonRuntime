namespace MelonRuntime.Abstractions.JavaScript
{
    public interface IJavaScriptQuery<TInteropObject>
    {
        public IJavaScriptQuery<TInteropObject> Into(string queryParameter);
        public TInteropObject GetResult();
    }
}
