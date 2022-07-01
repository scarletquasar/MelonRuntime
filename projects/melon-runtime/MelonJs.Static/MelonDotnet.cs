using System.Reflection;

namespace MelonJs.Static
{
    public static class MelonDotnet
    {
        public static dynamic? CallMethod(string nSpace, string search, string methodName, object[] parameters)
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

            return method?.Invoke(parameters[0], parameters.Skip(1).ToArray());
        }

        public static dynamic? GetField(string nSpace, string search, string fieldName)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            var type =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName!.Contains(search))
                .First();

            var field = type
                .GetFields()
                .Where(x => x.Name == fieldName)
                .FirstOrDefault();

            return field;
        }

        public static dynamic CreateInstanceOfType(string nSpace, string search, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            var type =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName!.Contains(search))
                .First();

            return Activator.CreateInstance(type!, parameters, null)!;
        }
    }
}
