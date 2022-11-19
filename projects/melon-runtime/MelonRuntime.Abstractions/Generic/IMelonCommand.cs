namespace MelonRuntime.Abstractions.Generic
{
    public interface IMelonCommand
    {
        public string Execute(string command, string[] parameters);
    }
}
