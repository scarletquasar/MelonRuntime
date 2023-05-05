using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Core.Library.Reflection;
using MelonRuntime.Domain.Core.Entities;
using Microsoft.CSharp.RuntimeBinder;

namespace MelonRuntime.Core
{
    public static class RealmManager
    {
        public static void CreateRealm(string name, IMelon<JsValue> melon)
        {
            lock (melon.GetRealms())
            {
                melon.GetRealms().Add(name, new Realm());
            }
        }

        public static void DeleteRealm(string name, int delay, IMelon<JsValue> melon)
        {
            lock (melon.GetRealms())
            {
                if (delay > 0)
                {
                    Task.Run(async () =>
                    {
                        await Task.Delay(delay);
                        melon.GetRealms().Remove(name);
                    });

                    return;
                }


                melon.GetRealms().Remove(name);
            }
        }

        public static void SetRealmPropertyFromScript(
            string realmName,
            string propertyName,
            dynamic value,
            IMelon<JsValue> melon
        )
        {
            lock (melon.GetRealms()[realmName])
                melon.GetRealms()[realmName][propertyName] = value;
        }

        public static void SetRealmPropertyFromInstance(
            string realmName,
            string propertyName,
            string nSpace,
            string type,
            object[] parameters,
            IMelon<JsValue> melon
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

            var directBindingFactories = DirectBindingFactories.GetFactories();

            var instance = directBindingFactories.CreateInstanceOfType(
                nSpace,
                type,
                parameterList.ToArray()
            );

            lock (melon.GetRealms()[realmName])
                melon.GetRealms()[realmName][propertyName] = instance!;
        }

        public static dynamic? GetRealmProperty(string realmName, string propertyName, IMelon<JsValue> melon)
        {
            return melon.GetRealms()[realmName][propertyName];
        }

        public static void DeleteRealmProperty(string realmName, string propertyName, IMelon<JsValue> melon)
        {
            lock (melon.GetRealms()[realmName])
                melon.GetRealms()[realmName].Remove(propertyName);
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
