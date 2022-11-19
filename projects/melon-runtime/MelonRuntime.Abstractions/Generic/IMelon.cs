namespace MelonRuntime.Abstractions.Generic
{
    public interface IMelon<TOutput>
    {
        public void LoadFile(string path);
        public TOutput InteropInvoke(TOutput target);
        public void SetInteropValue(string identifier, object value);
        public void AddOutputAction(Action<object> action);
        public void AddRuntimeErrorAction(Action<Exception> action);
        public void AddExternalErrorAction(Action<Exception> action);
        public Dictionary<string, IRealm> GetRealms();
        public Dictionary<string, object> GetEnvironmentVariables();
        public List<TOutput> GetOutput();
        public List<Exception> GetRuntimeErrors();
        public List<Exception> GetExternalErrors();
        public void SendInstructions(string instructions);
        public string? EvaluateInstructions(string instructions);
    }
}
