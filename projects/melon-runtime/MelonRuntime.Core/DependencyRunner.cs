//Some assembly dependencies need to be (explicitly) used in order to be available in Melon core functions

using System.Reflection;

namespace MelonRuntime.Core
{
    public static class DependencyRunner
    {
        public static void Setup()
        {
            Assembly.Load("System");
            Assembly.Load("System.Console");
            Assembly.Load("System.Text.Json");
            Assembly.Load("System.Diagnostics.Process");
        }
    }
}