using Cli.NET.Abstractions.Actions;
using MelonJS.Properties;

namespace MelonJS.Commands
{
    public class NewCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var currentPath = Environment.CurrentDirectory;

            var baseType = "js";
            var types = false;

            if(arguments.Length > 0)
            {
                baseType = arguments[0];

                if(arguments[0] == "ts")
                {
                    types = true;
                }
            }

            File.WriteAllText(currentPath + "/index." + baseType, Resources.NewProjectEntryPoint);
            File.WriteAllText(currentPath + "/melon.json", Resources.NewProjectMelonInfo);

            if(types)
            {
                File.WriteAllText(currentPath + "/package.json", Resources.NewProjectPackageInfo);
                File.WriteAllText(currentPath + "/tsconfig.json", Resources.NewProjectTsconfig);
            }
        }
    }
}
