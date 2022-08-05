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
            List<object> parameterList = new();

            foreach(var parameter in parameters)
            {
                try {
                    var paramType = ((dynamic)parameter).type;
                    var paramValue = ((dynamic)parameter).value;

                    var typedValue = GetTypedValueFromConstructorName(paramType, paramValue);

                    parameterList.Add(typedValue);
                }
                catch(RuntimeBinderException)
                {
                    parameterList.Add(parameter);
                }
            }

            var instance = ReflectionHelper.CreateInstanceOfType(nSpace, type, parameterList.ToArray());
            Runtime.Realms![realmName]![propertyName] = instance!;
        }
        public static dynamic? GetRealmProperty(string realmName, string propertyName) 
        {
            return Runtime.Realms![realmName]![propertyName];
        }
        private static object GetTypedValueFromConstructorName(string type, object value)
        {
            return type switch
            {
                "SByte" => Convert.ToSByte(value),
                "Byte" => Convert.ToByte(value),
                "Short" => Convert.ToInt16(value),
                "UShort" => Convert.ToUInt16(value),
                "Int" => Convert.ToInt32(value),
                "UInt" => Convert.ToUInt32(value),
                "Long" => Convert.ToInt64(value),
                "ULong" => Convert.ToUInt64(value),
                _ => value,
            };
        }
    }
}
