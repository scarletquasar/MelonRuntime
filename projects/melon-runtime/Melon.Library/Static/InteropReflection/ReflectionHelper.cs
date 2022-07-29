using System.Reflection;
namespace Melon.Library.Static.InteropReflection
{
    public static class ReflectionHelper
    {
        private static Tuple<string, List<Type>> _cachedMethodSearchTypes = new("", new());
        private static Tuple<string, List<Type>> _cachedFieldSearchTypes = new("", new());
        private static Tuple<string, List<Type>> _cachedInstanceCreationTypes = new("", new());
        public static dynamic? CallMethod(string nSpace, string search, string methodName, int index, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            IEnumerable<Type> types;

            if (_cachedMethodSearchTypes.Item1 != search)
            {
                types =
                    assemblies
                    .Select(assembly => assembly.GetTypes())
                    .SelectMany(x => x)
                    .Where(x => x.Namespace == nSpace)
                    .Where(x => x.FullName != null && x.FullName.Contains(search));

                lock (_cachedMethodSearchTypes!)
                {
                    _cachedMethodSearchTypes = new(search, types.ToList());
                }
            }
            else
            {
                types = _cachedMethodSearchTypes.Item2;
            }

            return
                types
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
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            IEnumerable<Type> types;

            if (_cachedFieldSearchTypes.Item1 != search)
            {
                types =
                    assemblies
                    .Select(assembly => assembly.GetTypes())
                    .SelectMany(x => x)
                    .Where(x => x.Namespace == nSpace)
                    .Where(x => x.FullName != null && x.FullName.Contains(search));

                lock (_cachedFieldSearchTypes!)
                {
                    _cachedFieldSearchTypes = new(search, types.ToList());
                }
            }
            else
            {
                types = _cachedFieldSearchTypes.Item2;
            }

            IQueryable<PropertyInfo> fields = types
                .First()
                .GetProperties(BindingFlags.Instance |
                       BindingFlags.Static |
                       BindingFlags.NonPublic |
                       BindingFlags.Public)
                .Where(x => x.Name == fieldName)
                .AsQueryable();

            var result = fields.FirstOrDefault();

            return result?.GetValue(null);
        }
        public static dynamic CreateInstanceOfType(string nSpace, string search, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            IEnumerable<Type> types;

            if (_cachedInstanceCreationTypes.Item1 != search)
            {
                types =
                    assemblies
                    .Select(assembly => assembly.GetTypes())
                    .SelectMany(x => x)
                    .Where(x => x.Namespace == nSpace)
                    .Where(x => x.FullName != null && x.FullName.Contains(search));

                lock (_cachedInstanceCreationTypes!)
                {
                    _cachedInstanceCreationTypes = new(search, types.ToList());
                }
            }
            else
            {
                types = _cachedInstanceCreationTypes.Item2;
            }

            return Activator.CreateInstance(types!.First(), parameters, null)!;
        }
    }
}