namespace MelonJs.JavaScript.Tools
{
    public static class BindingReader
    {
        public static string Get(string identifier)
        {
            var path = Environment.CurrentDirectory + "\\Bindings\\" + identifier + ".js";
            var content = string.Empty;

            if(File.Exists(path))
            {
                content = File.ReadAllText(path);
            }

            return content;
        }
    }
}