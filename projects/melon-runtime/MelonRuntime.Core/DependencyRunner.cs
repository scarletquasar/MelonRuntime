//Sonme dependencies need to be (explicitly) used in order to be available in Melon core functions
//Some usages will load MORE dependencies, this dangerously increase the entropy

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
        public static void Setup()
        {
            _ = System.Text.Json.JsonSerializer.Serialize(new { });
        }
    }
}