using Jint;
using MelonJs.Static.Jint;

namespace MelonJs.Static.Tools.Multitasking
{
    public static class Workers
    {
        private static Dictionary<string, Worker> _workers = new();

        public static void Add(string name, string script)
        {
            _workers.Add(name, new(name, script));
        }
        
        public static void Start(string name)
        {
            _workers[name].Start();
        }
    }

    public class Worker
    {
        private readonly string _script;
        private readonly string _name;

        public Worker(string name, string script)
        {
            _name = name;
            _script = script;
        }

        public async void Start()
        {
            await Task.Run(() => {
                var engine = new Engine();
                var result = engine.Evaluate(_script).AsString();
                JintStatic.CurrentJintEngine?.Execute($"std._workers.{_name}.result = '{result}'");
                JintStatic.CurrentJintEngine?.Execute($"(std._workers.{_name}.callback)('{result}')");
            });
        }

    }
}
