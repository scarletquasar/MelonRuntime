using Cli.NET.Tools;
using MelonRuntime.ProjectGenerator.Entities;

namespace MelonRuntime.ProjectGenerator
{
    public class ProjectWriter
    {
        public static readonly Schema TypeScript = new()
        {
            new(".env", "./.env", Models.DefaultDotEnv),
            new("src/main.ts", "./src/main.ts", Models.DefaultEntryPoint),
            new(".babelrc", "./.babelrc", Models.TypeScriptBabelrc),
            new("package.json", "./package.json", Models.TypeScriptPackageJson),
            new("tsconfig.json", "./tsconfig.json", Models.TypeScriptConfig),
            new(".gitignore", "./.gitignore", Models.DefaultGitignore),
            new("webpack.config.js", "./webpack.config.js", Models.DefaultWebpackConfig),
            new("webpack.config.dev.js", "./webpack.config.dev.js", Models.DevWebpackConfig)
        };

        public static readonly Schema JavaScript = new()
        {
            new(".env", "./.env", Models.DefaultDotEnv),
            new("src/main.js", "./src/main.js", Models.DefaultEntryPoint),
            new(".babelrc", "./.babelrc", Models.JavaScriptBabelrc),
            new("package.json", "./package.json", Models.JavaScriptPackageJson),
            new(".gitignore", "./.gitignore", Models.DefaultGitignore),
            new("webpack.config.js", "./webpack.config.js", Models.DefaultWebpackConfig),
            new("webpack.config.dev.js", "./webpack.config.dev.js", Models.DevWebpackConfig)
        };

        public Schema Schema { get; }
        public bool IsVerbose { get; }
        public string ProjectPath { get; }

        private readonly bool _createSrc;

        public ProjectWriter(Schema schema, string projectPath, bool createSrc, bool verbose)
        {
            Schema = schema;
            ProjectPath = projectPath;
            IsVerbose = verbose;
            _createSrc = createSrc;
        }

        public void Write()
        {
            if(_createSrc)
            {
                Directory.CreateDirectory("./src/");
            }

            int filesCount = Schema.Count;

            for (var index = 0; index < filesCount; index++)
            {
                var file = Schema.ElementAt(index);
                var targetPath = Path.Combine(ProjectPath, file.Item2);
                CreateProjectItem(file.Item1, targetPath, file.Item3, IsVerbose);
            }
        }

        private static void CreateProjectItem(string item, string path, string content, bool verbose)
        {
            if(verbose)
            {
                CLNConsole.Write("> ", ConsoleColor.Magenta);
                CLNConsole.Write("Creating project item ", ConsoleColor.Yellow);
                CLNConsole.Write(item, ConsoleColor.Cyan);
                Console.WriteLine();
            }

            File.WriteAllText(path, content);
        }
    }
}
