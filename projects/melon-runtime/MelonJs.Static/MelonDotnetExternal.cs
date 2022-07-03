using System.Reflection;
namespace MelonJs.Static
{
    public static class MelonDotnetExternal
    {
        public static dynamic? CallMethodDirectlyFromAssembly(
            string assemblyPath, 
            string nSpace, 
            string search, 
            string methodName, 
            object[] parameters)
        {
            var assembly = Assembly.LoadFrom(assemblyPath);

            IQueryable<Type> types = 
                assembly
                .GetTypes()
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search))
                .AsQueryable();

            IQueryable<MethodInfo> method =
                types
                .First()
                .GetMethods()
                .Where(x => x.Name == methodName)
                .AsQueryable();

            var result = method.FirstOrDefault();

            return result?.Invoke(parameters[0], parameters.Skip(1).ToArray());
        }

        public static dynamic? CallFieldDirectlyFromAssembly(
            string assemblyPath,
            string nSpace,
            string search,
            string fieldName)
        {
            var assembly = Assembly.LoadFrom(assemblyPath);

            IQueryable<Type> types =
                assembly
                .GetTypes()
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search))
                .AsQueryable();

            IQueryable<FieldInfo> field = 
                types
                .First()
                .GetFields()
                .Where(x => x.Name == fieldName)
                .AsQueryable();

            var result = field.FirstOrDefault();

            return result;
        }

        public static dynamic? CreateInstanceDirectlyFromAssembly(
            string assemblyPath,
            string nSpace,
            string search,
            object[] parameters)
        {
            var assembly = Assembly.LoadFrom(assemblyPath);

            IQueryable<Type> types =
                assembly
                .GetTypes()
                .Where(x => x.Namespace == nSpace)
                .Where(x => x.FullName != null && x.FullName.Contains(search))
                .AsQueryable();

            return Activator.CreateInstance(types!.First(), parameters, null)!;
        }
    }
}