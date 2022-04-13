namespace Cli.NET.Tools
{
    public static class CLNConsole
    {
        public static void WriteLine(string message) => Console.WriteLine(message);
        public static void WriteLine(string message, string color) => WriteLine(message, Enum.Parse<ConsoleColor>(color));
        public static void WriteLine(string message, int color) => WriteLine(message, (ConsoleColor)color);
        public static void WriteLine(string message, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        public static void Write(string message) => Console.Write(message);
        public static void Write(string message, string color) => Write(message, Enum.Parse<ConsoleColor>(color));
        public static void Write(string message, int color) => Write(message, (ConsoleColor)color);
        public static void Write(string message, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.Write(message);
            Console.ResetColor();
        }

        public static string ReadText() => Console.ReadLine() ?? string.Empty;
        public static string? ReadText(uint minLength = 0, uint maxLength = int.MaxValue)
        {
            string input = ReadText();

            if (input.Length > maxLength || input.Length < minLength)
                return null;

            return input;
        }

        public static string? DataQuestion(string message)
        {
            WriteLine(message);
            return ReadText();
        }
        public static string? DataQuestion(string message, string color, uint minLength = 0, uint maxLength = int.MaxValue)
        {
            return DataQuestion(message, Enum.Parse<ConsoleColor>(color), minLength, maxLength);
        }
        public static string? DataQuestion(string message, int color, uint minLength = 0, uint maxLength = int.MaxValue)
        {
            return DataQuestion(message, (ConsoleColor)color, minLength, maxLength);
        }
        public static string? DataQuestion(string message, ConsoleColor color, uint minLength = 0, uint maxLength = int.MaxValue)
        {
            WriteLine(message, color);
            return ReadText(minLength, maxLength);
        }
    }
}
