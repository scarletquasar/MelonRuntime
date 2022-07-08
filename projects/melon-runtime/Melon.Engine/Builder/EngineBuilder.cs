using Melon.Library.Static;

namespace Melon.Engine.Builder
{
    public class EngineBuilder
    {
        private readonly Jint.Engine _engine = new();

        public async Task Load(string identifier)
        {
            var content = await LibraryLoader.ByIdentifier(identifier);
            _engine.Execute(content);
        }

        public Jint.Engine Build()
        {
            _engine.SetValue("internalBinding", "undefined");
            return _engine;
        }
    }
}
