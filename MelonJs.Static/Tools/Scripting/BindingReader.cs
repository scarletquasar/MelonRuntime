using System.Reflection;

namespace MelonJs.Static.Tools.Scripting
{
    public static class BindingReader
    {
        public static string Get(string fragmentPath)
        {
            var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
            var path = classlibPath + "\\Bindings\\" + fragmentPath + ".js";

            var content = string.Empty;

            if(File.Exists(path))
            {
                content = File.ReadAllText(path);
            }


            return content;
        }
    }
}