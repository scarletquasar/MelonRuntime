namespace Cli.NET.Extensions
{
    public static class ParameterExtensions
    {
        public static IDictionary<string, string> GetArguments(this string[] parameters)
        {
            Dictionary<string, string> arguments = new();

            var targets = parameters.Skip(1);
            var argumentHeader = string.Empty;
            var argumentInformation = string.Empty;

            int currentHeaderIndex = -1;
            foreach (var target in targets)
            {
                if (target.StartsWith("-"))
                {
                    currentHeaderIndex++;
                    argumentHeader = target;
                }
                else
                {
                    argumentInformation += target;
                    arguments.Add(argumentHeader, argumentInformation);
                }
            }

            return arguments;
        }
    }
}
