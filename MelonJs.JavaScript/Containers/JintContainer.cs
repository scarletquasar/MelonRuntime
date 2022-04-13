using Jint;
using MelonJs.JavaScript.Extensions;

namespace MelonJs.JavaScript.Containers
{
    public class JintContainer
    {
        private readonly Engine _engine;

        public JintContainer(
            string? initialScript = null,
            bool enableConsoleLogging = true,
            bool enableFileSystem = true)
        {
            _engine = new();

            if (enableFileSystem) _engine.EnableFileSystem();
            if (enableConsoleLogging) _engine.EnableConsoleLogging();

            _engine.Execute(initialScript ?? "");
        }

        public void Execute(string script) => _engine.Execute(script);
    }
}