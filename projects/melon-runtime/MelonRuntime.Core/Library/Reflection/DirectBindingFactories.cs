using Jint.Native;
using System.Reflection;

namespace MelonRuntime.Core.Library.Reflection
{
    public class DirectBindingFactories
    {
        private static DirectBindingFactories? _instance;
        public IList<string> LoadedAssemblies { get; private set; }

        public static DirectBindingFactories GetFactories()
        {
            if(_instance is null)
            {
                _instance = new DirectBindingFactories();
            }

            return _instance;
        }

        public DirectBindingFactories()
        {
            _ = typeof(System.Text.Json.JsonSerializer);
            LoadedAssemblies = new List<string>();
        }

        public async Task<string?> LoadAssemblyAsync(string path)
        {
            return await Task.Factory.StartNew(() => LoadAssembly(path));
        }

        public string? LoadAssembly(string path)
        {
            var assembly = Assembly.LoadFile(path);
            LoadedAssemblies.Add(assembly.FullName ?? assembly.GetName().FullName);
            Static.CachedAssemblies = AppDomain.CurrentDomain.GetAssemblies();

            return assembly.FullName;
        }

        public void RemoveAssembly(string fullName)
        {
            LoadedAssemblies = LoadedAssemblies
                .Where(assembly => assembly != fullName)
                .ToList();

            Static.CachedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
        }

        public string?[] GetLoadedAssemblies()
        {
            return LoadedAssemblies.ToArray();
        }

        public dynamic? CallMethod(
            string ns,
            string typeName,
            string methodName,
            object[] parameters
        )
        {
            TryLoadAssembly(ns);

            var types = Static.CachedAssemblies!
                .Select(x => x.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == ns && x.Name == typeName);

            var targetType = types.First();
            var result = targetType.InvokeMember(
                methodName,
                BindingFlags.InvokeMethod,
                Type.DefaultBinder,
                null,
                parameters.ToArray()
            );

            return result;
        }

        public dynamic GetStaticProperty(string ns, string typeName, string propName)
        {
            TryLoadAssembly(ns);

            var type = Static.CachedAssemblies!
                .Select(x => x.GetTypes())
                .SelectMany(x => x)
                .FirstOrDefault(x => x.Namespace == ns && x.Name == typeName);

            var prop = type?
                .GetProperties(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                .FirstOrDefault(x => x.Name == propName);

            var result = prop?.GetValue(null);

            return result ?? JsValue.Undefined;
        }

        public dynamic CreateInstanceOfType(
            string ns,
            string search,
            object[] parameters
        )
        {
            TryLoadAssembly(ns);

            Type type = Static.CachedAssemblies!
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == ns)
                .Where(x => x.FullName != null && x.Name == search)
                .First();

            var result = Activator.CreateInstance(type, parameters);

            return result ?? JsValue.Undefined;
        }

        public dynamic GetTypes(string ns)
        {
            Type[] types = Static.CachedAssemblies!
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == ns)
                .GroupBy(x => new { x.Name })
                .Select(x => x.Last())
                .ToArray();

            return (object)types ?? JsValue.Undefined;
        }

        private static void TryLoadAssembly(string assemblyName)
        {
            try
            {
                Assembly.Load(assemblyName);
            }
            catch (FileNotFoundException) { }
        }
    }
}