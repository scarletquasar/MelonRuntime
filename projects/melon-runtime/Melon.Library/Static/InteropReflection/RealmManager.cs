using Melon.Static.Runtime;

namespace Melon.Library.Static.InteropReflection
{
    public static class RealmManager
    {
        public static void CreateRealm(string name)
        {
            Runtime.Realms!.Add(name, new());
        }
        public static void SetRealmPropertyFromScript(string realmName, string propertyName, dynamic value)
        {
            Runtime.Realms![realmName]![propertyName] = value;
        }
        public static void SetRealmPropertyFromInstance(
            string realmName, 
            string propertyName, 
            string nSpace,
            string type,
            object[] parameters
            )
        {
            var instance = ReflectionHelper.CreateInstanceOfType(nSpace, type, parameters);
            Runtime.Realms![realmName]![propertyName] = instance!;
        }
        public static dynamic? GetRealmProperty(string realmName, string propertyName) 
        {
            return Runtime.Realms![realmName]![propertyName];
        }
    }
}
