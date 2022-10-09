using Melon.Library.Static;
using Melon.Models.Engine;
using Newtonsoft.Json;
using System.Reflection;

namespace Melon.Engine.Builders
{
    public class EngineBuilder
    {
        private Jint.Engine? _engine;
        private readonly Dictionary<string, string> _loadedScripts;

        public EngineBuilder()
        {
            _loadedScripts = new();
        }

        public EngineBuilder Load(string identifier)
        {
            var content = LibraryLoader.ByIdentifier(identifier);
            _loadedScripts.Add(identifier, content);

            return this;
        }

        public Jint.Engine Build()
        {
            var internalBinding = InternalBinding.Dictionary;

            _engine = new();
            _engine.SetValue("_$internalBinding", internalBinding);

            foreach (var script in _loadedScripts)
            {
                var code = script.Value;
                _engine.Execute(code);
            }

            var names = JsonConvert.SerializeObject(_loadedScripts.Keys.ToArray());

            var version = Assembly.GetCallingAssembly().GetName().Version!;
            var versionScriptConstructor =
                $"new Melon.Version({version.Major}, {version.Minor}, {version.Build})";

            var melon = new EngineOperation(_engine)
                .WithBase("Melon")
                .WithProperty("std")
                .WithProperty("melon");

            melon.WithProperty("loadedModules").Set(names);
            melon.WithProperty("currentVersion").Set(versionScriptConstructor);

            return _engine;
        }
    }
}
