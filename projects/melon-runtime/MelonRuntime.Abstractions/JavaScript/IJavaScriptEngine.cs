namespace MelonRuntime.Abstractions.JavaScript
{
    public interface IJavaScriptEngine<TInteropObject>
    {
        public void ImportModule(string path);
        public TInteropObject InteropInvoke(TInteropObject target);
        public void SetInteropValue(string identifier, object value);
        public void SendInstructions(string instructions);
        public TInteropObject EvaluateInstructions(string instructions);
    }
}