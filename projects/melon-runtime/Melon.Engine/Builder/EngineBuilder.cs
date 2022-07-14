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

        public EngineBuilder Load(string identifier)
        {
            var content = LibraryLoader.ByIdentifier(identifier);
            _engine.Execute(content);

            return this;
        }

        public Jint.Engine Build()
        {
            return _engine;
        }
    }
}
