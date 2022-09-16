namespace Melon.Models
{
    internal class EngineAssemblerParameters
    {
        internal EngineAssemblerParameters(List<string> disallowedLibraries)
        {
            DisallowedLibraries = disallowedLibraries;
        }

        internal List<string> DisallowedLibraries { get; set; }
    }
}
