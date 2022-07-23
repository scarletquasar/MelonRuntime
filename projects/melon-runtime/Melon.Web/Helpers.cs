using Cli.NET.Tools;

namespace Melon.Web
{
    public static class Helpers
    {
        public static void DisplayMelonAspnetInformation(string defaultUri)
        {
            Console.WriteLine();
            CLNConsole.Write("[Melon ASP.NET host] ", ConsoleColor.DarkYellow);
            CLNConsole.Write("Starting web application with default: ", ConsoleColor.Green);
            CLNConsole.Write(defaultUri, ConsoleColor.Blue);
            Console.WriteLine();
            Console.WriteLine();
        }
    }
}
