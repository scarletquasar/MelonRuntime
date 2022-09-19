using System.Reflection;

namespace Melon.Library.Static.InteropReflection
{
    public static class ReflectionHelper
    {
        public static HashSet<Assembly> LoadedAssemblies { get; private set; } = new();

        public static string? LoadAssembly(string path)
        {
            var assembly = Assembly.LoadFrom(path);
            LoadedAssemblies.Add(assembly);

            return assembly.FullName;
        }

        public static void RemoveAssembly(string fullName)
        {
            LoadedAssemblies = LoadedAssemblies
                .Where(assembly => assembly.FullName != fullName)
                .ToHashSet();
        }

        public static string?[] GetLoadedAssemblies()
        {
            return LoadedAssemblies.Select(x => x.FullName).ToArray();
        }

        public static dynamic? CallMethod(
            string nSpace,
            string search,
            string methodName,
            object[] parameters
        )
        {
            var assemblies = AppDomain.CurrentDomain
                .GetAssemblies()
                .Concat(LoadedAssemblies)
                .ToHashSet();

            IEnumerable<Type> types = assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search));

            return types
                .First()
                .InvokeMember(
                    methodName,
                    BindingFlags.InvokeMethod,
                    Type.DefaultBinder,
                    null,
                    parameters.ToArray()
                );
        }

        public static dynamic? GetStaticProperty(string nSpace, string search, string fieldName)
        {
            var assemblies = AppDomain.CurrentDomain
                .GetAssemblies()
                .Concat(LoadedAssemblies)
                .ToHashSet();

            IEnumerable<Type> types = assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search));

            IQueryable<PropertyInfo> fields = types
                .First()
                .GetProperties(
                    BindingFlags.Instance
                        | BindingFlags.Static
                        | BindingFlags.NonPublic
                        | BindingFlags.Public
                )
                .Where(x => x.Name == fieldName)
                .AsQueryable();

            var result = fields.FirstOrDefault();

            return result?.GetValue(null);
        }

        public static dynamic? CreateInstanceOfType(
            string nSpace,
            string search,
            object[] parameters
        )
        {
            var assemblies = AppDomain.CurrentDomain
                .GetAssemblies()
                .Concat(LoadedAssemblies)
                .ToHashSet();

            Type type = assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.Name == search)
                .First();

            return Activator.CreateInstance(type, parameters);
        }
    }
}