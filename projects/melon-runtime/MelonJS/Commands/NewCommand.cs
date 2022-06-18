using Cli.NET.Interfaces.Actions;
using Cli.NET.Tools;
using MelonJS.Properties;

namespace MelonJS.Commands
{
    public class NewCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var currentPath = Environment.CurrentDirectory + (arguments.Length > 0 ? string.Join("", arguments) : "");

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write("src/index.ts", ConsoleColor.Cyan);
            Console.WriteLine();

            Directory.CreateDirectory(currentPath + "/src/");
            File.WriteAllText(currentPath + "/src/index.ts", Resources.NewProjectEntryPoint);

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write("melon.json", ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(currentPath + "/melon.json", Resources.NewProjectMelonInfo);

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write(".babelrc", ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(currentPath + "/.babelrc", Resources.NewProjectBabelrc);

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

            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write("README.md", ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(currentPath + "/README.md", Resources.NewProjectReadme);
        }
    }
}
