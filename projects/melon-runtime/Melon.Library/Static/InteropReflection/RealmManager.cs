using Melon.Static.Runtime;
using Microsoft.CSharp.RuntimeBinder;

namespace Melon.Library.Static.InteropReflection
{
    public static class RealmManager
    {
        public static void CreateRealm(string name)
        {
            Runtime.Realms!.Add(name, new());
        }

        public static void SetRealmPropertyFromScript(
            string realmName,
            string propertyName,
            dynamic value
        )
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
            List<object> parameterList = new();

            foreach (var parameter in parameters)
            {
                try
                {
                    var paramType = ((dynamic)parameter).type;
                    var paramValue = ((dynamic)parameter).value;

                    var typedValue = GetTypedValue(paramType, paramValue);

                    parameterList.Add(typedValue);
                }
                catch (RuntimeBinderException)
                {
                    parameterList.Add(parameter);
                }
            }

            var instance = ReflectionHelper.CreateInstanceOfType(
                nSpace,
                type,
                parameterList.ToArray()
            );
            Runtime.Realms![realmName]![propertyName] = instance!;
        }

        public static dynamic? GetRealmProperty(string realmName, string propertyName)
        {
            return Runtime.Realms![realmName]![propertyName];
        }

        private static object GetTypedValue(string type, object value)
        {
            return type switch
            {
                "sbyte" => Convert.ToSByte(value),
                "byte" => Convert.ToByte(value),
                "short" => Convert.ToInt16(value),
                "ushort" => Convert.ToUInt16(value),
                "int" => Convert.ToInt32(value),
                "uint" => Convert.ToUInt32(value),
                "long" => Convert.ToInt64(value),
                "ulong" => Convert.ToUInt64(value),
                _ => value,
            };
        }
    }
}
