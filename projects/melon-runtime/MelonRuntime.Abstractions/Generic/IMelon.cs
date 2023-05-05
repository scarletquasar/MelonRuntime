using Jint.Native;

namespace MelonRuntime.Abstractions.Generic
{
    public interface IMelon<TOutput>
    {
        public void LoadFile(string path, bool isModule);
        public TOutput InteropInvoke(TOutput target);
        public void SetInteropValue(string identifier, object value);
        public void AddOutputAction(Action<object> action);
        public void AddRuntimeErrorAction(Action<Exception> action);
        public void AddExternalErrorAction(Action<Exception> action);
        public Dictionary<string, IRealm> GetRealms();
        public Dictionary<string, dynamic> GetEvents();
        public Dictionary<string, object> GetEnvironmentVariables();
        public List<TOutput> GetOutput();
        public List<Exception> GetRuntimeErrors();
        public List<Exception> GetExternalErrors();
        public void EnqueueInstructions(string instructions);
        public JsValue EnqueueEvaluation(string instructions);
        public void SendInstructions(string instructions);
        public JsValue EvaluateInstructions(string instructions);
    }
}
