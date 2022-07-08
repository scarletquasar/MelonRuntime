namespace Melon.Library.Static
{
    public static class LibraryLoader
    {
        public static async Task<string> ByIdentifier(string identifier)
        {
            var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
            var path = classlibPath + $"/{identifier}.js";

            var content = await File.ReadAllTextAsync(path);

            return content;
        }
    }
}