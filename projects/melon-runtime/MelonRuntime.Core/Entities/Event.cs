using Jint.Native;
using MelonRuntime.Abstractions.JavaScript;
using System.Collections.Concurrent;

namespace MelonRuntime.Core.Entities
{
    public enum EventCaller
    {
        System,
        Cronjob,
        User
    }

    public enum EventType
    {
        LocalInputOutput,
        RemoteInputOutput,
        InteropTransaction
    }

    public class Event
    {
        public IReadOnlyCollection<string> Metadata { get; set; }
        public EventCaller Caller { get; set; }
        public EventType Type { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public bool Finished { get; set; }
        public bool Paused { get; set; }

        private readonly IJavaScriptEngine<JsValue> _engine;
        private readonly LinkedList<JsValue> _actions;

        public Event(
            IJavaScriptEngine<JsValue> engine,
            string name,
            EventCaller caller,
            EventType type,
            JsValue[] actions)
        {
            _engine = engine;
            _actions = new LinkedList<JsValue>(actions);

            Metadata = new ConcurrentBag<string>();
            Caller = caller;
            Type = type;
        }

        public async Task Run()
        {
            if (Finished || _actions.Count == 0)
            {
                Finished = true;
                return;
            }

            if (!Paused)
            {
                await Task.Run(() => _engine.InteropInvoke(_actions.First()));
                _actions.RemoveFirst();
            }

            await Run();
        }
    }
}
