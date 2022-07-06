namespace MelonJs.Static.Tools.Scripting
{
    public static class BindingManager
    {
        public static string Get(string fragmentPath)
        {
            var classlibPath = AppDomain.CurrentDomain.BaseDirectory;
            var path = classlibPath + "/Bindings/" + fragmentPath + ".js";
            var content = File.ReadAllText(path);

            return content;
        }
    }
}