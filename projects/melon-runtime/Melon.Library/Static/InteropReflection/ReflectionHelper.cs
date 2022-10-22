using System.Reflection;

namespace Melon.Library.Static.InteropReflection
{
    public static class ReflectionHelper
    {
        public static IList<string> LoadedAssemblies { get; private set; } = new List<string>();
        private static Assembly[] _cachedAssemblies = AppDomain.CurrentDomain.GetAssemblies();

        public static async Task<string?> LoadAssemblyAsync(string path)
        {
            return await Task.Factory.StartNew(() => LoadAssembly(path));
        }

        public static string? LoadAssembly(string path)
        {
            var assembly = Assembly.LoadFile(path);
            LoadedAssemblies.Add(assembly.FullName ?? assembly.GetName().FullName);
            _cachedAssemblies = AppDomain.CurrentDomain.GetAssemblies();

            return assembly.FullName;
        }

        public static void RemoveAssembly(string fullName)
        {
            LoadedAssemblies = LoadedAssemblies
                .Where(assembly => assembly != fullName)
                .ToList();

            _cachedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
        }

        public static string?[] GetLoadedAssemblies()
        {
            return LoadedAssemblies.ToArray();
        }

        public static dynamic? CallMethod(
            string ns,
            string typeName,
            string methodName,
            object[] parameters
        )
        {
            var type = _cachedAssemblies
                .Select(x => x.GetTypes())
                .SelectMany(x => x)
                .FirstOrDefault(x => x.Namespace == ns && x.Name == typeName);

            return type?.InvokeMember(
                methodName,
                BindingFlags.InvokeMethod,
                Type.DefaultBinder,
                null,
                parameters.ToArray()
            );
        }

        public static dynamic? GetStaticProperty(string ns, string typeName, string propName)
        {
            var type = _cachedAssemblies
                .Select(x => x.GetTypes())
                .SelectMany(x => x)
                .FirstOrDefault(x => x.Namespace == ns && x.Name == typeName);

            var prop = type?
                .GetProperties(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                .FirstOrDefault(x => x.Name == propName);

            return prop?.GetValue(null);
        }

        public static dynamic? CreateInstanceOfType(
            string ns,
            string search,
            object[] parameters
        )
        {
            Type type = _cachedAssemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == ns)
                .Where(x => x.FullName != null && x.Name == search)
                .First();

            return Activator.CreateInstance(type, parameters);
        }

        public static dynamic GetTypes(string ns)
        {
            Type[] types = _cachedAssemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == ns)
                .GroupBy(x => new { x.Name })
                .Select(x => x.Last())
                .ToArray();

            return types;
        }
    }
}
