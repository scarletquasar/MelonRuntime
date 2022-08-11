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
            ProjectScheme projectFiles;
            int projectFilesCount;

            if (arguments.Any())
            {
                Directory.CreateDirectory("./src/");

                projectFiles = arguments[0] switch
                {
                    "typescript" => GetTypeScriptScheme(),
                    "javascript" => GetJavaScriptScheme(),
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
        private static ProjectScheme GetTypeScriptScheme()
        {
            return new()
            {
                new("src/index.ts", "./src/index.ts", Resources.NewProjectTsIndex),
                new(".babelrc", "./.babelrc", Resources.NewProjectTsBabelRc),
                new("package.json", "./package.json", Resources.NewProjectTsPackageInfo),
                new("tsconfig.json", "./tsconfig.json", Resources.NewProjectTsconfig),
                new(".gitignore", "./.gitignore", Resources.NewProjectTsGitIgnore),
                new("webpack.config.production.js", "./webpack.config.production.js", Resources.NewProjectTsWebpackConfigProduction),
                new("webpack.config.development.js", "./webpack.config.development.js", Resources.NewProjectTsWebpackConfigDevelopment)
            };
        }
        private static ProjectScheme GetJavaScriptScheme()
        {
            return new()
            {
                new("src/index.js", "./index.js", Resources.NewProjectJsIndex),
                new("package.json", "./package.json", Resources.NewProjectJsPackageInfo),
            };
        }
    }
}