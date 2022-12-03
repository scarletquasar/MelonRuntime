using MelonRuntime.ProjectGenerator;
using Newtonsoft.Json;
using Microsoft.VisualBasic.FileIO;
using Cli.NET.Tools;
using MelonRuntime.ProjectGenerator.Models;

namespace MelonRuntime.ProjectGenerator
{
    public static class Generator
    {
        private static async Task CreateProjectItem(string item, string path, string content, bool verbose)
        {
            if(verbose)
            {
                CLNConsole.Write("> ", ConsoleColor.Magenta);
                CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
                CLNConsole.Write(item, ConsoleColor.Cyan);
                Console.WriteLine();
            }

            await File.WriteAllTextAsync(path, content);
        }

        private static Schema GetTypeScriptScheme()
        {
            return new()
            {
                new(".env", "./.env", Resources.DotEnv),
                new("src/index.ts", "./src/index.ts", Resources.NewProjectTsIndex),
                new(".babelrc", "./.babelrc", Resources.NewProjectTsBabelRc),
                new("package.json", "./package.json", Resources.NewProjectTsPackageInfo),
                new("tsconfig.json", "./tsconfig.json", Resources.NewProjectTsconfig),
                new(".gitignore", "./.gitignore", Resources.NewProjectTsGitIgnore),
                new(
                    "webpack.config.production.js",
                    "./webpack.config.production.js",
                    Resources.NewProjectWebpackConfigProduction
                ),
                new(
                    "webpack.config.development.js",
                    "./webpack.config.development.js",
                    Resources.NewProjectWebpackConfigDevelopment
                )
            };
        }

        private static Schema GetJavaScriptScheme()
        {
            return new()
            {
                new(".env", "./.env", Resources.DotEnv),
                new("src/index.js", "./src/index.js", Resources.NewProjectJsIndex),
                new("package.json", "./package.json", Resources.NewProjectJsPackageInfo),
                new(
                    "webpack.config.production.js",
                    "./webpack.config.production.js",
                    Resources.NewProjectWebpackConfigProduction
                ),
                new(
                    "webpack.config.development.js",
                    "./webpack.config.development.js",
                    Resources.NewProjectWebpackConfigDevelopment
                )
            };
        }
    }
}
