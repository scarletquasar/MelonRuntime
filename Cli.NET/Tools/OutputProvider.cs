using Cli.NET.Models;

namespace Cli.NET.Tools
{
    public class OutputProvider
    {
        private readonly OutputList _outputList;

        /// <summary>
        /// Create a new OutputProvider to manage outputs.
        /// </summary>
        public OutputProvider()
        {
            _outputList = new();
        }

        /// <summary>
        /// Add a log to the output list.
        /// </summary>
        /// <param name="message"></param>
        /// <param name="type"></param>
        public void AddLog(string message, OutputType type)
        {
            _outputList.Add(DateTime.Now, new Output(message, type));
        }

        /// <summary>
        /// Add an exception log to the output list.
        /// </summary>
        /// <param name="exception"></param>
        public void AddLog(Exception exception)
        {
            _outputList.Add(DateTime.Now, new Output(exception.Message, OutputType.Error));
        }

        /// <summary>
        /// Get the output list.
        /// </summary>
        /// <returns></returns>
        public OutputList GetOutput() => _outputList;
    } 
}
