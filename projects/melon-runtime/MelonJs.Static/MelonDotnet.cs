using System.Reflection;

namespace MelonJs.Static
{
    public static class MelonDotnet
    {
        public static void CallMethod(string nSpace, string search, string methodName, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            var type =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName.Contains(search))
                .First();

            var method = type
                .GetMethods()
                .Where(x => x.Name == methodName)
                .FirstOrDefault();

            method?.Invoke(parameters[0], parameters.Skip(1).ToArray());
        }


        //run __dotnet__.CallMethod("System", "Console", "WriteLine", ['', '', ''])
    }
}
