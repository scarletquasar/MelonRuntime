namespace Melon.Models
{
    internal class EngineAssemblerParameters
    {
        internal EngineAssemblerParameters(List<string> disallowedLibraries, bool silentMode)
        {
            DisallowedLibraries = disallowedLibraries;
            SilentMode = silentMode;
        }

        internal List<string> DisallowedLibraries { get; set; }
        internal bool SilentMode { get; set; }
    }
}
