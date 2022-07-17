namespace Melon.Library.Static.OS
{
    public class OSBinding
    {
        public static object GetOSInformation()
        {
            var os = Environment.OSVersion;

            return new
            {
                platform = os.Platform.ToString(),
                version = os.VersionString,
                servicePack = os.ServicePack
            };
        }
    }
}
