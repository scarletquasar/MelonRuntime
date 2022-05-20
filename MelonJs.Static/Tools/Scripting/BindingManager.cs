namespace MelonJs.Static.Tools.Scripting
{
    public static class BindingManager
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

        public static string PreparseReferenceCommands(string script, Dictionary<string, string> commands)
        {
            foreach(var command in commands)
            {
                var rep = script.Replace("\n", ";").Split(";");
                rep = rep.Select(x =>
                {
                    if (
                        x.StartsWith($"{command.Key}(")
                        || x.Contains($" {command.Key}(")
                        || x.Contains($"={command.Key}(")
                        || x.Contains($"+{command.Key}(")
                        || x.Contains($"-{command.Key}(")
                        || x.Contains($"*{command.Key}(")
                        )
                    {
                        x = x.Replace($"{command.Key}(", $"{command.Value}('").Replace(")", "')");
                    }

                    return x;
                }).ToArray();

                script = string.Join(";", rep);
            }

            return script;
        }
    }
}