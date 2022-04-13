namespace Cli.NET.Models
{
    public class Output
    {
        /// <summary>
        /// Output default model to manage console responses.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="type"></param>
        public Output(string message, OutputType type)
        {
            Message = message;
            Type = type;    
        }

        public OutputType Type { get; set; }
        public string Message { get; set; }
    }
}
