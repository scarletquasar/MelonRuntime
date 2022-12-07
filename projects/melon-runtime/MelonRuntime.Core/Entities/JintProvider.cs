using Jint;
using Jint.Native;
using MelonRuntime.Abstractions.JavaScript;

namespace MelonRuntime.Core.Entities
{
    public class JintProvider : IJavaScriptEngine<JsValue>, IDisposable
    {
        private readonly Engine _engine;

        public JintProvider()
        {
            var path = Path.GetPathRoot(Environment.SystemDirectory) ?? Directory.GetCurrentDirectory();

            _engine = new(options =>
            {
                options.EnableModules(path!);
            });
        }

        public void ImportModule(string path)
        {
            _engine.ImportModule(path);
        }

        public JsValue InteropInvoke(JsValue target)
        {
            return _engine.Invoke(target);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            _engine.Dispose();
        }

        public JsValue EvaluateInstructions(string instructions)
        {
            return _engine.Evaluate(instructions);  
        }

        public void SendInstructions(string instructions)
        {
            _engine.Execute(instructions);
        }

        public void SetInteropValue(string identifier, object value)
        {
            _engine.SetValue(identifier, value);
        }
    }
}
