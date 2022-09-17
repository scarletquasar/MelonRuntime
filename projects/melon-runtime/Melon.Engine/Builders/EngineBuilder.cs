using Melon.Library.Static;
using Newtonsoft.Json;
using System.Reflection;

namespace Melon.Engine.Builders
{
    public class EngineBuilder
    {
        private Jint.Engine? engine;
        private readonly Dictionary<string, string> loadedScripts;

        public EngineBuilder()
        {
            loadedScripts = new();
        }

        public EngineBuilder Load(string identifier)
        {
            var content = LibraryLoader.ByIdentifier(identifier);
            loadedScripts.Add(identifier, content);

            return this;
        }

        public Jint.Engine Build()
        {
            var internalBinding = InternalBinding.Dictionary;

            engine = new();
            engine.SetValue("_$internalBinding", internalBinding);

            foreach (var script in loadedScripts)
            {
                var code = script.Value;
                engine.Execute(code);
            }

            var names = JsonConvert.SerializeObject(loadedScripts.Keys.ToArray());
            var version = Assembly.GetCallingAssembly().GetName().Version!;
            var versionScriptConstructor =
                $"new Melon.Version({version.Major}, {version.Minor}, {version.Build})";

            engine.Execute($"Melon.std.melon.loadedModules = {names}");
            engine.Execute($"Melon.std.melon.currentVersion = {versionScriptConstructor}");

            return engine;
        }
    }
}
