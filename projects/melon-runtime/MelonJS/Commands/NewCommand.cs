using Cli.NET.Abstractions.Actions;
using Cli.NET.Tools;
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

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write("index." + baseType, ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(currentPath + "/index." + baseType, Resources.NewProjectEntryPoint);

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write("melon.json", ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(currentPath + "/melon.json", Resources.NewProjectMelonInfo);

            if(types)
            {
                CLNConsole.Write("> ", ConsoleColor.DarkRed);
                CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
                CLNConsole.Write("package.json", ConsoleColor.Cyan);
                Console.WriteLine();

                File.WriteAllText(currentPath + "/package.json", Resources.NewProjectPackageInfo);

                CLNConsole.Write("> ", ConsoleColor.DarkRed);
                CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
                CLNConsole.Write("tsconfig.json", ConsoleColor.Cyan);
                Console.WriteLine();

                File.WriteAllText(currentPath + "/tsconfig.json", Resources.NewProjectTsconfig);
            }
        }
    }
}
