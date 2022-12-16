namespace MelonRuntime.Abstractions.CLI
{
    public interface IRuntimeCLI
    {
        public void WaitForScript(Func<bool> loopCondition);
        public void ExecuteInstruction(string command, string[] argv);
        public void ExecuteEntryPoint();
        public void DisplayHeader();
    }
}
