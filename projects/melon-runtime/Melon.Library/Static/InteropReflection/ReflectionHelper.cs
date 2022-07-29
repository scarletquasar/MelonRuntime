using System.Reflection;
namespace Melon.Library.Static.InteropReflection
{
    public static class ReflectionHelper
    {
        public static dynamic? CallMethod(string nSpace, string search, string methodName, int index, object[] parameters)
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            IEnumerable<Type> types;

            types =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search));

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

            types =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search));

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

            types =
                assemblies
                .Select(assembly => assembly.GetTypes())
                .SelectMany(x => x)
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search));

            return Activator.CreateInstance(types!.First(), parameters, null)!;
        }
    }
}