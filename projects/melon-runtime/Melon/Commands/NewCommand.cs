using Cli.NET.Interfaces.Actions;
using Cli.NET.Tools;
using Melon.Properties;

namespace Melon.Commands
{
    public class NewCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var currentPath = Environment.CurrentDirectory + (arguments.Length > 0 ? string.Join("", arguments) : "");

            Directory.CreateDirectory(currentPath + "/src/");

            HashSet<Tuple<string, string, string>> projectFiles = new()
            {
                new("src/index.ts", currentPath + "/src/index.ts", Resources.NewProjectIndex),
                new(".babelrc", currentPath + "/.babelrc", Resources.NewProjectBabelRc),
                new("package.json", currentPath + "/package.json", Resources.NewProjectPackageInfo),
                new("tsconfig.json", currentPath + "/tsconfig.json", Resources.NewProjectTsconfig),
                new(".gitignore", currentPath + "/.gitignore", Resources.NewProjectGitIgnore)
            };

            int projectFilesCount = projectFiles.Count;

            for(var index = 0; index < projectFilesCount; index++)
            {
                var file = projectFiles.ElementAt(index);
                CreateProjectFile(file.Item1, file.Item2, file.Item3);
            }
        }

        private static void CreateProjectFile(string item, string path, string content)
        {
            CLNConsole.Write("> ", ConsoleColor.DarkRed);
            CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
            CLNConsole.Write(item, ConsoleColor.Cyan);
            Console.WriteLine();

            File.WriteAllText(path, content);
        }
    }
}