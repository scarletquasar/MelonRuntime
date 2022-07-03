using System.Reflection;
namespace MelonJs.Static
{
    public static class MelonDotnetInternal
    {
        private static Tuple<string, List<Type>> _cachedMethodSearchTypes = new("", new());
        private static Tuple<string, List<Type>> _cachedFieldSearchTypes = new("", new());
        private static Tuple<string, List<Type>> _cachedInstanceCreationTypes = new("", new());
        public static dynamic? CallMethod(string nSpace, string search, string methodName, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            IEnumerable<Type> types;

            if(_cachedMethodSearchTypes.Item1 != search)
            {
                types =
                    assemblies
                    .Select(assembly => assembly.GetTypes())
                    .SelectMany(x => x)
                    .Where(x => x.Namespace == nSpace)
                    .Where(x => x.FullName != null && x.FullName.Contains(search));

                lock(_cachedMethodSearchTypes!)
                {
                    _cachedMethodSearchTypes = new(search, types.ToList());
                }
            }
            else
            {
                types = _cachedMethodSearchTypes.Item2;
            }

            IQueryable<MethodInfo> method =
                types
                .First()
                .GetMethods()
                .Where(x => x.Name == methodName)
                .AsQueryable();

            var result = method.FirstOrDefault();

            return result?.Invoke(parameters[0], parameters.Skip(1).ToArray());
        }

        public static dynamic? GetField(string nSpace, string search, string fieldName)
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

            IQueryable<FieldInfo> field = types
                .First()
                .GetFields()
                .Where(x => x.Name == fieldName)
                .AsQueryable();

            var result = field.FirstOrDefault();

            return result;
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
