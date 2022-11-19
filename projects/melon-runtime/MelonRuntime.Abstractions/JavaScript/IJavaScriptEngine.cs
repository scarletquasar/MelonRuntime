namespace MelonRuntime.Abstractions.JavaScript
{
    public interface IJavaScriptEngine<TInteropObject>
    {
        public TInteropObject InteropInvoke(TInteropObject target);
        public void SetInteropValue(string identifier, object value);
        public void SendInstructions(string instructions);
        public TInteropObject EvaluateInstructions(string instructions);
    }
}