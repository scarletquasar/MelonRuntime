using Cli.NET.Interfaces.Actions;
using Cli.NET.Tools;
using Melon.Models;
using Melon.Properties;

namespace Melon.Commands
{
    public class NewCommand : ICommand
    {
        public void Execute(string[] arguments)
        {
            var currentPath = Environment.CurrentDirectory + (arguments.Length > 0 ? string.Join("", arguments) : "");

            Directory.CreateDirectory(currentPath + "/src/");
            ProjectScheme projectFiles;
            int projectFilesCount;

            if (arguments.Any())
            {
                projectFiles = arguments[0] switch
                {
                    "--typescript" => GetTypeScriptScheme(currentPath),
                    "--javascript" => GetJavaScriptScheme(currentPath),
                    _ => throw new ArgumentException(Consts.NotSpecifiedProjectError),
                };
            }
            else
            {
                throw new ArgumentException(Consts.NotSpecifiedArgumentError);
            }

            projectFilesCount = projectFiles.Count;

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

        private static ProjectScheme GetTypeScriptScheme(string currentPath)
        {
            return new()
            {
                new("src/index.ts", currentPath + "/src/index.ts", Resources.NewProjectTsIndex),
                new(".babelrc", currentPath + "/.babelrc", Resources.NewProjectTsBabelRc),
                new("package.json", currentPath + "/package.json", Resources.NewProjectTsPackageInfo),
                new("tsconfig.json", currentPath + "/tsconfig.json", Resources.NewProjectTsconfig),
                new(".gitignore", currentPath + "/.gitignore", Resources.NewProjectTsGitIgnore)
            };
        }

        private static ProjectScheme GetJavaScriptScheme(string currentPath)
        {
            return new()
            {
                new("src/index.js", currentPath + "/index.js", Resources.NewProjectJsIndex),
                new("package.json", currentPath + "/package.json", Resources.NewProjectJsPackageInfo),
            };
        }
    }
}