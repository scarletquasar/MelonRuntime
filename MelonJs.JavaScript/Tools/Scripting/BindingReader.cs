namespace MelonJs.JavaScript.Tools.Scripting
{
    public static class BindingReader
    {
        public static string Get(string fragmentPath)
        {
            var path = Environment.CurrentDirectory + "\\Bindings\\" + fragmentPath + ".js";
            var content = string.Empty;

            if(File.Exists(path))
            {
                content = File.ReadAllText(path);
            }

            return content;
        }
    }
}