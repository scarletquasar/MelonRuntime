using Melon.Library.Static.OS;

namespace Melon.Library.Static
{
    public static class InternalBinding
    {
        public static dynamic Get(string target)
        {
            switch(target)
            {
                case "BaseDirectory":
                    return Environment.CurrentDirectory;

                case "OsInformation":
                    return OSBinding.GetOSInformation();

                default:
                    throw new ArgumentException($"{target} not found.");
            }
        }
    }
}
