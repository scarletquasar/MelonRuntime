using Jint.Native;
using Melon.Library.Static;

namespace Melon.Engine.Builder
{
    public class EngineBuilder
    {
        private readonly Jint.Engine _engine;

        public EngineBuilder()
        {
            var internalBinding = new Func<string, dynamic>(InternalBinding.Get);

            _engine = new();
            _engine.SetValue("internalBinding", internalBinding);
        }

        public async Task Load(string identifier)
        {
            var content = await LibraryLoader.ByIdentifier(identifier);
            _engine.Execute(content);
        }

        public Jint.Engine Build()
        {
            _engine.SetValue("internalBinding", JsValue.Undefined);
            return _engine;
        }
    }
}
