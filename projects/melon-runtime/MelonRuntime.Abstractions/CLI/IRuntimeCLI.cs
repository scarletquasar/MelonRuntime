namespace MelonRuntime.Abstractions.CLI
{
    public interface IRuntimeCLI
    {
        public void WaitForScript(Func<bool> loopCondition);
        public void AddCommand(string name, Action<string[]> action);
        public void ExecuteCommand(string command, string[] args);
        public void ExecuteEntryPoint();
        public void DisplayHeader();
    }
}
