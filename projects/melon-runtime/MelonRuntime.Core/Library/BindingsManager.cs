using DotnetFetch.Models;
using Jint.Native;
using MelonRuntime.Abstractions.Generic;
using MelonRuntime.Abstractions.Library.Database;
using MelonRuntime.Core.Entities;
using MelonRuntime.Core.Library.Database;
using MelonRuntime.Core.Library.Reflection;
using MelonRuntime.Core.Library.Threading;
using MelonRuntime.Core.Library.Web;
using MelonRuntime.Domain.Core.Library.Web;
using Microsoft.VisualBasic.FileIO;
using System.Dynamic;

namespace MelonRuntime.Core.Library
{
    public class BindingsManager
    {
        private readonly IMelon<JsValue>? _melon;
        private static BindingsManager? _instance;

        private readonly DirectBindingFactories _bindingFactories;

        public static BindingsManager GetManager(IMelon<JsValue> melon)
        {
            if (_instance is null)
            {
                _instance = new BindingsManager(melon);
            }

            return _instance;
        }

        public BindingsManager(IMelon<JsValue> melon)
        {
            _melon = melon;
            _bindingFactories = DirectBindingFactories.GetFactories();
        }

        public IDictionary<string, dynamic> GetBindings()
        {
            var allBindings = new List<Dictionary<string, dynamic>>()
            {
                GetDirectDatabaseProviderBindings(),
                GetDirectBindingFactories(),
                GetHttpClientBindings(),
                GetThreadingBindings(),
                GetRealmBindings(),
                GetEnvironmentBindings(),
                GetFileSystemBindings()
            };

            return allBindings
                .SelectMany(x => x)
                .ToDictionary(pair => pair.Key, pair => pair.Value);
        }

        private static Dictionary<string, dynamic> GetDirectDatabaseProviderBindings()
        {
            static Func<string, dynamic, string> getQueryFunction<T>() where T : IDirectDatabaseProvider
            {
                var instance = (IDirectDatabaseProvider)Activator.CreateInstance(typeof(T))!;
                return instance.ExecuteQuery;
            }

            static Func<string, dynamic, int> getNonQueryFunction<T>() where T : IDirectDatabaseProvider
            {
                var instance = (IDirectDatabaseProvider)Activator.CreateInstance(typeof(T))!;
                return instance.ExecuteNonQuery;
            }

            return new()
            {
                ["PostgreSQLBindingQuery"] = getQueryFunction<PostgreSQLDirectDatabaseProvider>(),
                ["PostgreSQLBindingNonQuery"] = getNonQueryFunction<PostgreSQLDirectDatabaseProvider>(),
                ["MySqlBindingQuery"] = getQueryFunction<MySqlDirectDatabaseProvider>(),
                ["MySqlBindingNonQuery"] = getNonQueryFunction<MySqlDirectDatabaseProvider>(),
                ["SqlServerBindingQuery"] = getQueryFunction<SqlServerDirectDatabaseProvider>(),
                ["SqlServerBindingNonQuery"] = getNonQueryFunction<SqlServerDirectDatabaseProvider>(),
            };
        }

        private Dictionary<string, dynamic> GetDirectBindingFactories()
        {
            var callStaticMethodBinding = 
                new Func<string, string, string, object[], dynamic?>(_bindingFactories.CallMethod);

            var getStaticProperty =
                new Func<string, string, string, dynamic>(_bindingFactories.GetStaticProperty);

            var getTypes = new Func<string, dynamic>(_bindingFactories.GetTypes);
            var loadAssembly = new Func<string, string?>(_bindingFactories.LoadAssembly);
            var loadAssemblyAsync = new Func<string, Task<string?>>(_bindingFactories.LoadAssemblyAsync);

            return new()
            {
                ["CallStaticMethod"] = callStaticMethodBinding,
                ["GetStaticProperty"] = getStaticProperty,
                ["GetTypes"] = getTypes,
                ["LoadAssembly"] = loadAssembly,
                ["LoadAssemblyAsync"] = loadAssemblyAsync
            };
        }

        private static Dictionary<string, dynamic> GetHttpClientBindings()
        {
            var httpRequest = 
                new Func<string, string, string, string, HttpRequestResponse>(HttpProvider.Request);

            var httpRequestAsync = 
                new Func<string, string, string, string, Task<HttpRequestResponse>>(HttpProvider.RequestAsync);

            var fetchRequest = new Func<string, ExpandoObject?, Task<Response>>(HttpProvider.Fetch);

            return new()
            {
                ["HttpRequest"] = httpRequest,
                ["HttpRequestAsync"] = httpRequestAsync,
                ["Fetch"] = fetchRequest
            };
        }

        private Dictionary<string, dynamic> GetThreadingBindings()
        {
            Thread createThread(JsValue action)
            {
                return ThreadingManager.CreateThread(action, _melon!);
            }

            Task<JsValue> createTask(JsValue action)
            {
                return ThreadingManager.CreateTask(action, _melon!);
            }

            return new()
            {
                ["CreateThread"] = new Func<JsValue, Thread>(createThread),
                ["CreateTask"] = new Func<JsValue, Task<JsValue>>(createTask),
            };
        }

        private Dictionary<string, dynamic> GetRealmBindings()
        {
            void createRealm(string name)
            {
                RealmManager.CreateRealm(name, _melon!);
            }

            void deleteRealm(string name, int delay)
            {
                RealmManager.DeleteRealm(name, delay, _melon!);
            }

            void setRealmScriptProperty(string realm, string key, dynamic value)
            {
                RealmManager.SetRealmPropertyFromScript(realm, key, value, _melon!);
            }

            void setRealmInstanceProperty(
                string realm, 
                string key, 
                string nSpace, 
                string type, 
                object[] parameters)
            {
                RealmManager.SetRealmPropertyFromInstance(realm, key, nSpace, type, parameters, _melon!);
            }

            object? getRealmProperty(string realm, string key)
            {
                return RealmManager.GetRealmProperty(realm, key, _melon!);
            }

            return new()
            {
                ["CreateRealm"] = new Action<string>(createRealm),
                ["DeleteRealm"] = new Action<string, int>(deleteRealm),
                ["GetRealmProperty"] = new Func<string, string, object?>(getRealmProperty),
                ["SetRealmScriptProperty"] = new Action<string, string, dynamic>(setRealmScriptProperty),
                ["SetRealmInstanceProperty"] = 
                    new Action<string, string, string, string, object[]>(setRealmInstanceProperty)
            };
        }

        private Dictionary<string, dynamic> GetEnvironmentBindings()
        {
            return new()
            {
                ["LocalEnvironmentVariables"] = _melon!.GetEnvironmentVariables()
            };
        }

        private Dictionary<string, dynamic> GetFileSystemBindings()
        {
            return new()
            {
                { "ReadFileText", new Func<string, string>(File.ReadAllText) },
                {
                    "ReadFileTextAsync",
                    new Func<string, CancellationToken, Task<string>>(File.ReadAllTextAsync)
                },
                { "WriteFileText", new Action<string, string?>(File.WriteAllText) },
                {
                    "WriteFileTextAsync",
                    new Func<string, string?, CancellationToken, Task>(File.WriteAllTextAsync)
                },
                { "ReadFileBytes", new Func<string, byte[]>(File.ReadAllBytes) },
                {
                    "ReadFileBytesAsync",
                    new Func<string, CancellationToken, Task<byte[]>>(File.ReadAllBytesAsync)
                },
                { "WriteFileBytes", new Action<string, byte[]>(File.WriteAllBytes) },
                {
                    "WriteFileBytesAsync",
                    new Func<string, byte[], CancellationToken, Task>(File.WriteAllBytesAsync)
                },
                { "DeleteFile", new Action<string>(File.Delete) },
                { "CopyFile", new Action<string, string, bool>(File.Copy) },
                { "MoveFile", new Action<string, string, bool>(File.Move) },
                { "RenameFile", new Action<string, string>(FileSystem.RenameFile) },
                { "RenameDirectory", new Action<string, string>(FileSystem.RenameDirectory) },
                { "CreateDirectory", new Func<string, DirectoryInfo>(Directory.CreateDirectory) },
                { "DeleteDirectory", new Action<string, bool>(Directory.Delete) },
            };
        }
    }
}
