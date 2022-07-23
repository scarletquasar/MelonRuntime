using Melon.Library.Static;

namespace Melon.Engine.Builders
{
    public class EngineBuilder
    {
        private readonly Jint.Engine engine;
        private readonly HashSet<string> loadedScripts;

        public EngineBuilder()
        {
            var internalBinding = InternalBinding.Dictionary;

            engine = new();
            engine.SetValue("_$internalBinding", internalBinding);
            loadedScripts = new HashSet<string>();
        }

        public EngineBuilder Load(string identifier)
        {
            var content = LibraryLoader.ByIdentifier(identifier);
            loadedScripts.Add(content);

            return this;
        }

        public Jint.Engine Build()
        {
            for (short index = 0; index < loadedScripts.Count; index++)
            {
                engine.Execute(loadedScripts.ElementAt(index));
            }

            return engine;
        }
    }
}
