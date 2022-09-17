using System.Security;

namespace Melon.Library.Static
{
    public static class LibraryLoader
    {
        [SecurityCritical]
        public static string ByIdentifier(string identifier)
        {
            var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
            var path = classlibPath + $"/{identifier}.js";

            var content = File.ReadAllText(path);

            return content;
        }
    }
}
