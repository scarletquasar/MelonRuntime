using Melon.Library.Static;

namespace Melon.Engine.Builders
{
    public class EngineBuilder
    {
        private readonly Jint.Engine _engine;
        private readonly HashSet<string> _loadedScripts;

        public EngineBuilder()
        {
            var internalBinding = InternalBinding.Dictionary;

            _engine = new();
            _engine.SetValue("_$internalBinding", internalBinding);
            _loadedScripts = new HashSet<string>();
        }

        public EngineBuilder Load(string identifier)
        {
            var content = LibraryLoader.ByIdentifier(identifier);
            _loadedScripts.Add(content);

            return this;
        }

        public Jint.Engine Build()
        {
            for (short index = 0; index < _loadedScripts.Count; index++)
            {
                _engine.Execute(_loadedScripts.ElementAt(index));
            }

            return _engine;
        }
    }
}
