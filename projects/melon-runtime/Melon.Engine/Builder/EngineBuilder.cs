using Jint.Native;
using Melon.Library.Static;

namespace Melon.Engine.Builder
{
    public class EngineBuilder
    {
        private readonly Jint.Engine _engine;

        public EngineBuilder()
        {
            var internalBinding = InternalBinding.Dictionary;

            _engine = new();
            _engine.SetValue("_$internalBinding", internalBinding);
        }

        public async Task Load(string identifier)
        {
            var content = await LibraryLoader.ByIdentifier(identifier);
            _engine.Execute(content);
        }

        public Jint.Engine Build()
        {
            return _engine;
        }
    }
}
