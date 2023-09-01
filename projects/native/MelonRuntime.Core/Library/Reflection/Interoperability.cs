using System.Runtime.CompilerServices;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;
using MelonRuntime.Abstractions.Library.Database;
using MelonRuntime.Core.Library.Database;

//TODO: Work in progress class; Should not be used directly on the current modules.
//INFO: The Interoperability module is a reworked version of the future deprecated BindingsManager with the objective of 
//offering better, cached and reliable interoperability functions and models to create a better bridge between the JavaScript
//interface and the .NET CLR. It was made taking all the current features that can be used in the current CLR in consideration.
namespace MelonRuntime.Core.Library.Reflection {
	/// <summary>
	/// Representation of an Assembly object in the interoperability context,
	/// capable of open and use the internal namespaces of it. Can be created
	/// from an external file. InteropAssembly
	/// and is not useful as direct provider to get features from after the engine
	/// startup operation. The caching strategy is divided in two phases, the first
	/// one is to immediately cache the most common resources that will be used
	/// by runtime operations and the second phase is keep some caching lazy load
	/// and create it when the first related search is requested but also avoiding
	/// performance peaks that can affect production-running applications directly.
	/// </summary>
	public static class Interoperability 
	{
		public static IDictionary<string, object>? GlobalMemo { get; private set; }
		/// <summary>
		/// Interoperability GUID-based memo, works with an unique id that
		/// will be obtained after the first <namespace:type?:target?>
		/// search that is already speed-up due to the cache capabilities.
		/// </summary>
		private static IDictionary<string, InteropAssembly>? _assemblyMemo;	
		
		/// <summary>
		/// Type memo with [search]:[class|enum] results.
		/// </summary>
		private static IDictionary<string, object>? _typeMemo;
		
		/// <summary>
		/// Search-based memo where the enties are direct results of the
		/// interoperability searches. This is useful to get even faster
		/// results from the lookup table. Usually
		/// the specialized memo will get GUID-based ones as base to 
		/// fetch the target resources.
		/// </summary>
		private static IDictionary<string, object[]>? _specializedMemo;
		
		/// <summary>
		/// Cache initialization works getting the assemblies from the current domain
		/// and using diverse execution strategies in order to maximize the filled gaps
		/// during the cache aggregation. It is not guaranteed that all the assemblies,
		/// classes, fields and methods will be available after the execution. This
		/// optimization method is in constant evolution. Warning: this is an one-time
		/// execution method due to its heavy nature and high resources consumption.
		/// </summary>
		public static void InitializeCache() 
		{
			_assemblyMemo = new Dictionary<string, InteropAssembly>();
			_typeMemo = new Dictionary<string, object>();
			_specializedMemo = new Dictionary<string, object[]>();
			
			// 1. Getting the InteropAssembly objects from the current active AppDomain
			var domainAssemblies = AppDomain.CurrentDomain
				.GetAssemblies()
				.Select(assembly => new InteropAssembly(
					assembly, 
					assembly.GetTypes()))
				.ToArray();
					
			foreach (var assembly in domainAssemblies)
			{
				var name = Guid.NewGuid().ToString();
				_assemblyMemo?.Add(name, assembly);
			}
			
			// 2. Getting the InteropAssembly objects from specific loadable targets
			// netstandard
			var assemblyNetstandard = Assembly.Load("netstandard");
			var interopNetstandard = new InteropAssembly(
				assemblyNetstandard,
				assemblyNetstandard.GetTypes(), 
				"netstandard");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopNetstandard);
				
			// System
			var assemblySystem = Assembly.Load("System");
			var interopSystem = new InteropAssembly(
				assemblySystem, 
				assemblySystem.GetTypes(), 
				"System");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystem);
				
			// System.Runtime
			var assemblySystemRuntime = Assembly.Load("System.Runtime");
			var interopSystemRuntime = new InteropAssembly(
				assemblySystemRuntime, 
				assemblySystemRuntime.GetTypes(), 
				"System.Runtime");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystemRuntime);
				
			// System.Console
			var assemblySystemConsole = Assembly.Load("System.Console");
			var interopSystemConsole = new InteropAssembly(
				assemblySystemConsole, 
				assemblySystemConsole.GetTypes(), 
				"System.Console");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystemConsole);
				
			// System.Text.Json
			var assemblySystemTextJson = Assembly.Load("System.Text.Json");
			var interopSystemTextJson = new InteropAssembly(
				assemblySystemTextJson, 
				assemblySystemTextJson.GetTypes(), 
				"System.Text.Json.dll");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystemTextJson);
				
			// System.Net.Http
			var assemblySystemNetHttp = Assembly.Load("System.Net.Http");
			var interopSystemNetHttp = new InteropAssembly(
				assemblySystemNetHttp, 
				assemblySystemNetHttp.GetTypes(), 
				"System.Net.Http.dll");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystemNetHttp);
				
			// System.Diagnostics.Process
			var assemblySystemDiagnosticsProcess = Assembly.Load("System.Diagnostics.Process");
			var interopSystemDiagnosticsProcess = new InteropAssembly(
				assemblySystemDiagnosticsProcess, 
				assemblySystemDiagnosticsProcess.GetTypes(), 
				"System.Diagnostics.Process.dll");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopSystemDiagnosticsProcess);
				
			// External Newtonsoft.Json
			var assemblyNewtonsoftJson = Assembly.Load("Newtonsoft.Json");
			var interopNewtonsoftJson = new InteropAssembly(
				assemblyNewtonsoftJson, 
				assemblyNewtonsoftJson.GetTypes(), 
				"Newtonsoft.Json.dll");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopNewtonsoftJson);
				
			// External Cli.NET
			var assemblyCliNET = Assembly.Load("Cli.NET");
			var interopCliNET = new InteropAssembly(
				assemblyCliNET, 
				assemblyCliNET.GetTypes(), 
				"Cli.NET");
				
			_assemblyMemo?.Add(Guid.NewGuid().ToString(), interopCliNET);
			
			// 3. Fills the specialized memo cache with the most common resources
			// System.Text.Json.JsonSerializer.Serialize
			var systemTextJsonSerialize1 = new Action<Stream, object?, Type, JsonSerializerOptions?>(JsonSerializer.Serialize);
			var systemTextJsonSerialize2 = new Action<Stream, object?, Type, System.Text.Json.Serialization.JsonSerializerContext>(JsonSerializer.Serialize);
			var systemTextJsonSerialize3 = new Func<object?, Type, JsonSerializerOptions?, string>(JsonSerializer.Serialize);
			var systemTextJsonSerialize4 = new Action<Utf8JsonWriter, object?, Type, JsonSerializerOptions?>(JsonSerializer.Serialize);
			var systemTextJsonSerialize5 = new Func<object, string>((object value) => JsonSerializer.Serialize(value));
			
			_specializedMemo.Add("System.Text.Json.JsonSerializer.Serialize", new object[]
			{
				systemTextJsonSerialize1,
				systemTextJsonSerialize2,
				systemTextJsonSerialize3,
				systemTextJsonSerialize4,
				systemTextJsonSerialize5 
			});
			
			// System.Text.Json.JsonSerializer.Deserialize
			var systemTextJsonDeserialize1 = new Func<Stream, Type, JsonSerializerOptions?, object?>(JsonSerializer.Deserialize);
			var systemTextJsonDeserialize2 = new Func<JsonNode?, JsonSerializerOptions?, object?>(JsonSerializer.Deserialize<object>);
			var systemTextJsonDeserialize3 = new Func<string, object?>((string target) => 
			{
				return JsonSerializer.Deserialize<object>(target);
			});
			
			_specializedMemo.Add("System.Text.Json.JsonSerializer.Deserialize", new object[]
			{
				systemTextJsonDeserialize1,
				systemTextJsonDeserialize2,
				systemTextJsonDeserialize3
			});
			
			// MelonRuntime.Core.Library.Serialization.SerializationManager.Serialize
			var melonSerializationManagerSerialize = new Func<object, string>(Serialization.SerializationManager.Serialize);
			_specializedMemo.Add("MelonRuntime.Core.Library.Serialization.SerializationManager.Serialize", new[] { melonSerializationManagerSerialize });
			
			// MelonRuntime.Core.Library.Serialization.SerializationManager.Deserialize
			var melonSerializationManagerDeserialize = new Func<string, object?>(Serialization.SerializationManager.Deserialize);
			_specializedMemo.Add("MelonRuntime.Core.Library.Serialization.SerializationManager.Deserialize", new[] { melonSerializationManagerDeserialize });
			
			// 4. Fills the global memo with the default bindings
			GlobalMemo = new Dictionary<string, object>();
			
			// Data bindings
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
			
			GlobalMemo.Add("postgresql-query", getQueryFunction<PostgreSQLDirectDatabaseProvider>());
			GlobalMemo.Add("mysql-query", getQueryFunction<MySqlDirectDatabaseProvider>());
			GlobalMemo.Add("sqlserver-query", getQueryFunction<SqlServerDirectDatabaseProvider>());
			GlobalMemo.Add("postgresql-command", getNonQueryFunction<PostgreSQLDirectDatabaseProvider>());
			GlobalMemo.Add("mysql-command", getNonQueryFunction<MySqlDirectDatabaseProvider>());
			GlobalMemo.Add("sqlserver-command", getNonQueryFunction<SqlServerDirectDatabaseProvider>());
		}
		
		/// <summary>
		/// Method focused on finding a specific static method with overloads
		/// based on a [namespace::type::name] search. The results can be used
		/// in JavaScript with a wrapper class to interoperability purposes.
		/// </summary>
		private static InteropMethod[]? FindStaticMethod(string @namespace, string type, string name, bool forceNewSearch = true) 
		{
			var methodsFromSpecializedMemo = _specializedMemo?
			.Where(memo => 
			{
				// If memo's first value is a method, then the rest already are 
				var memoIsAction = memo.Value.FirstOrDefault()?.GetType()?.FullName?.StartsWith("System.Action") ?? false;
				var memoIsFunc = memo.Value.FirstOrDefault()?.GetType()?.FullName?.StartsWith("System.Func") ?? false;
				
				return (memoIsAction || memoIsFunc) && memo.Key == $"{@namespace}.{type}.{name}";
			})
			.SelectMany(memo => memo.Value)
			.Select(value => 
			{
				var methodInfo = (MethodInfo)((dynamic)value).Method;
				
				// TODO: Check if the value.GetType() is the correct one for this check
				var isAsync = 
					(AsyncStateMachineAttribute?)methodInfo?.GetCustomAttribute(value.GetType())
					is not null;
				
				var parameters = methodInfo?
					.GetParameters()
					.Select(parameter => (parameter.Name, parameter.ParameterType))
					.ToArray();
				
				var finalMethod = new InteropMethod(
					methodInfo?.Name, 
					parameters, 
					methodInfo?.GetGenericArguments(), 
					methodInfo, 
					isAsync, 
					methodInfo?.IsStatic ?? false);
					
				return finalMethod;
			});
			
			if (!methodsFromSpecializedMemo?.Any() ?? false || forceNewSearch) 
			{
				var targetNamespace = _assemblyMemo?
					.Select(memo => new InteropNamespace(memo.Value.FullName, memo.Value))
					.FirstOrDefault(target => target.FullName == @namespace);
					
				var targetClasses = targetNamespace?.GetClasses();
				var targetMethods = targetClasses?
					.Select(targetClass => targetClass
						.GetMethods()
						.Where(method => method.Name == name))
					.SelectMany(method => method);
				
				return Enumerable.Concat(
					methodsFromSpecializedMemo ?? Array.Empty<InteropMethod>(), 
					targetMethods ?? Array.Empty<InteropMethod>()).ToArray();
			}
			
			return methodsFromSpecializedMemo?.ToArray();
		}
		
		/// <summary>
		/// Merhod focused in finding a specific class based on a [namespace::type]
		/// search that will be handled in JavaScript with a wrapper class to 
		/// interoperability purposes.
		/// </summary>
		private static InteropClass? FindClass(string @namespace, string name, bool forceNewSearch = true) 
		{
			var classesFromTypeMemo = _typeMemo?
				.Select(memo => memo.Value)
				.Where(obj => obj.GetType() == typeof(InteropClass))
				.Cast<InteropClass>()
				.Where(@class => @class.FullName == $"{@namespace}.{name}");
				
			if (!classesFromTypeMemo?.Any() ?? false || forceNewSearch) 
			{
				var targetClasses = _assemblyMemo?.Select(assembly => assembly
					.Value
					.GetNamespaces()
					.Item1?
					.Where(targetNamespace => targetNamespace.FullName == @namespace))
					.SelectMany(x => x)
					.SelectMany(targetNamespace => targetNamespace.GetClasses());
					
				if (targetClasses == null) return null;
				foreach (var targetClass in targetClasses) 
				{
					_typeMemo?.Add(targetClass.FullName, targetClass);
				}
				
				return targetClasses?.FirstOrDefault();
			}
			
			return classesFromTypeMemo?.FirstOrDefault();
		}
		private static InteropEnum? FindEnum(string @namespace, string name, bool forceNewSearch = true) 
		{
			var enumsFromTypeMemo = _typeMemo?
				.Select(memo => memo.Value)
				.Where(obj => obj.GetType() == typeof(InteropEnum))
				.Cast<InteropEnum>()
				.Where(@enum => @enum.FullName == $"{@namespace}.{name}");
				
			if (!enumsFromTypeMemo?.Any() ?? false || forceNewSearch) 
			{
				var targetEnums = _assemblyMemo?.Select(assembly => assembly
					.Value
					.GetNamespaces()
					.Item1?
					.Where(targetNamespace => targetNamespace.FullName == @namespace))
					.SelectMany(x => x)
					.SelectMany(targetNamespace => targetNamespace.GetEnums());
				
				if (targetEnums == null) return null;
				foreach (var targetEnum in targetEnums) 
				{
					_typeMemo?.Add(targetEnum.FullName, targetEnum);
				}
				
				return targetEnums?.FirstOrDefault();
			}
			
			return enumsFromTypeMemo?.FirstOrDefault();
		}
		
		/// <summary>
		/// Method focused on finding a specific static property with overloads
		/// based on a [namespace::type::name] search. The results can be used
		/// in JavaScript with a wrapper class to interoperability purposes.
		/// </summary>
		private static object? FindStaticProperty(string @namespace, string type, string name, bool forceNewSearch = true) 
		{
			//Pre-warmer to fill the cache with the target type
			_ = forceNewSearch ? FindClass(@namespace, type) : null;
			
			//Operation
			var targetType = _typeMemo?
				.Select(memo => memo.Value)
				.Where(obj => obj.GetType() == typeof(InteropClass))
				.Cast<InteropClass>()
				.Where(@class => @class.FullName == $"{@namespace}.${type}")
				.FirstOrDefault();

			var prop = targetType?
				.GetProperties()?
				.Where(property => property.IsStatic)
				.FirstOrDefault(x => x.Name == name);
				
			return prop?.Value;
		}
		
		private static object? FindStaticField(string @namespace, string type, string name, bool forceNewSearch = true) 
		{
			//Pre-warmer to fill the cache with the target type
			_ = forceNewSearch ? FindClass(@namespace, type) : null;
			
			//Operation
			var targetType = _typeMemo?
				.Select(memo => memo.Value)
				.Where(obj => obj.GetType() == typeof(InteropClass))
				.Cast<InteropClass>()
				.Where(@class => @class.FullName == $"{@namespace}.${type}")
				.FirstOrDefault();

			var field = targetType?
				.GetFields()?
				.Where(field => field.IsStatic)
				.FirstOrDefault(x => x.Name == name);
				
			return field?.Value;
		}
	}
	
	public class InteropAssembly
	{
		public string? FullName { get; private set; }
		public string? FilePath { get; private set; }
		
		private Assembly? _assembly;
		private Type[]? _types;
		private bool _open;
		private InteropNamespace[]? _namespaces;
		
		public InteropAssembly(Assembly assembly, Type[]? types, string? filePath = null) 
		{
			_assembly = assembly;
			_types = types;
			
			_namespaces = _types?
				.Select(type => new InteropNamespace(type?.FullName, this))
				.ToArray();
				
			FilePath = filePath;
			FullName = _assembly.FullName;
			
			_open = true;
		}
		
		public InteropAssembly() 
		{
			_open = false;
		}
		
		/// <summary>
		/// Returns the target assembly object relative to the InteropAssembly
		/// instance.
		/// </summary>
		public (Assembly?, NullReferenceException?) GetAssemblyObject() 
		{
			NullReferenceException? error = null;
			
			if (_assembly == null) 
			{
				error = new NullReferenceException("The assembly is not defined");
			}
			
			return (_assembly, error);
		}
		
		/// <summary>
		/// Loads an external assembly information plus the assembly itself
		/// to an existing InteropAssembly instance.
		/// </summary>
		public async Task<(Assembly?, Exception?)> OpenFile(string path) 
		{
			Assembly? result = null;
			Exception? error = null;
			
			if (_open) 
			{
				error = new InvalidOperationException("InteropAssembly was already opened.");
				return (result, error);
			}
			
			try 
			{
				var file = await File.ReadAllBytesAsync(path);
				result = Assembly.Load(file);
				
				_open = true;
				_assembly = result;
				_types = _assembly.GetTypes();
				FullName = result.FullName;
				FilePath = path;
			}
			catch (Exception e) {
				error = e;
			}
			
			return (result, error);
		}
		/// <summary>
		/// Return all namespaces contained in a InteropAssembly as a
		/// InteropNamespace[]
		/// </summary>
		public (InteropNamespace[]?, Exception?) GetNamespaces() 
		{
			Exception? error = null;

			if (!_open)
			{
				error = new InvalidOperationException("The InteropAssembly was not initialized.");
				return (_namespaces, error);
			}
			
			return (_namespaces, error);
		}
	}
	
	/// <summary>
	/// Represents an interoperability namespace. It contains interoperability
	/// information about classes, enums, the assembly itself and metadata.
	/// This class is an abstraction to represent a real namespace, it is important
	/// to know that there are no types in the runtime capable of making this kind of
	/// representation. The data can be not fully accurante and result in faulting
	/// features of the target namespace.
	/// </summary>
	public class InteropNamespace 
	{
		public string? FullName { get; private set; }
		private InteropAssembly? _assembly;
		private InteropClass[]? _classes;
		private InteropEnum[]? _enums;
		
		public InteropNamespace(string? fullName, InteropAssembly interopAssembly) 
		{
			FullName = fullName;
			_assembly = interopAssembly;
			
			var allTypes = _assembly
				.GetAssemblyObject()
				.Item1?
				.GetTypes()
				.Where(type => type.Namespace == FullName);
				
			_enums = allTypes?
				.Where(type => type.IsEnum)
				.Select(type => 
				{
					var assembly = GetAssembly();
					var enumValues = new InteropEnumValues(
						Enum
							.GetValues(type)
							.Cast<object>()
							.ToArray(),
						assembly,
						this);
					
					var @enum = new InteropEnum(fullName, assembly, this, enumValues);
					return @enum;
				})
				.ToArray();
			
			_classes = allTypes?
				.Where(type => !type.IsEnum)
				.Select(type => 
				{
					var isStatic = type.IsAbstract && type.IsSealed;
					var methods = type
						.GetMethods()
						.Select(method => 
						{
							var parameters = method
								.GetParameters()
								.Select(parameter => (
									parameter.Name, 
									parameter.ParameterType))
								.ToArray();
								
							var genericArguments = method.GetGenericArguments();
							var isAsync = 
								(AsyncStateMachineAttribute?)method.GetCustomAttribute(type)
								is not null;
							
							return new InteropMethod(
								method.Name,
								parameters!,
								genericArguments,
								method,
								isAsync,
								method.IsStatic);
						})
						.ToArray();
						
					var fields = type
						.GetFields()
						.Select(field => new InteropField(field.Name, field.FieldType, field.IsStatic, field.GetValue(null)))
						.ToArray();
						
					var properties = type
						.GetProperties()
						.Select(prop => new InteropProperty(
							prop.Name, 
							prop.PropertyType, 
							prop.GetAccessors(nonPublic: true)[0].IsStatic, 
							prop.GetValue(null)))
						.ToArray();
						
					var interopClass = new InteropClass(
						fullName, 
						isStatic, 
						type.IsAbstract, 
						type.GetConstructors(),
						this,
						GetAssembly(),
						type,
						methods,
						fields,
						properties);
						
					return interopClass;
				})
				.ToArray();
		}
		
		public InteropAssembly? GetAssembly() 
		{
			return _assembly;
		}
		
		
		public InteropClass[]? GetClasses() 
		{
			return _classes;
		}
		
		public InteropEnum[]? GetEnums() 
		{
			return _enums;
		}
	}
	
	public class InteropClass
	{
		private InteropAssembly? _assembly;
		private InteropNamespace? _namespace;
		private InteropMethod[]? _methods;
		private InteropField[]? _fields;
		private InteropProperty[]? _properties;
		private Type? _type;
		private ConstructorInfo[]? _constructors;
		
		public string? FullName { get; private set; }
		public bool IsStatic { get; private set; }
		public bool IsAbstract { get; private set; }
		
		public object? Instance(object[] parameters) 
		{
			if (_type == null) return null;
			return Activator.CreateInstance(_type, parameters);
		}
		
		public InteropMethod[]? GetMethods() 
		{
			return _methods;
		}
		
		public InteropProperty[]? GetProperties() 
		{
			return _properties;
		}
		
		public InteropField[]? GetFields() 
		{
			return _fields;
		}
		
		public InteropClass(
			string? fullName,
			bool isStatic,
			bool isAbstract,
			ConstructorInfo[]? constructors, 
			InteropNamespace? @namespace, 
			InteropAssembly? assembly,
			Type? type,
			InteropMethod[]? methods,
			InteropField[]? fields,
			InteropProperty[]? properties)	
		{
			FullName = fullName;
			IsStatic = isStatic;
			IsAbstract = isAbstract;
			
			_constructors = constructors;
			_namespace = @namespace;
			_assembly = assembly;
			_type = type;
			_methods = methods;
			_fields = fields;
			_properties = properties;
		}
	}
	
	public class InteropEnum 
	{
		public string? FullName { get; private set; }
		
		private InteropAssembly? _assembly;
		private InteropNamespace? _namespace;
		private InteropEnumValues? _values;
		
		public InteropEnum(
			string? fullName, 
			InteropAssembly? assembly, 
			InteropNamespace? @namespace,
			InteropEnumValues? values) 
		{
			FullName = fullName;
			_assembly = assembly;
			_namespace = @namespace;
			_values = values;
		}
	}
	
	public class InteropEnumValues
	{
		public object[] Values { get; private set; }
		
		private InteropAssembly? _assembly;
		private InteropNamespace? _namespace;
		
		public InteropEnumValues(
			object[] values,
			InteropAssembly? assembly, 
			InteropNamespace? @namespace) 
		{
			Values = values;
			_assembly = assembly;
			_namespace = @namespace;
		}
	}
	
	public class InteropField 
	{
		public string? Name { get; private set; }
		public Type? Type { get; private set; }
		public bool IsStatic { get; private set; }
		public object? Value { get; private set; }
		
		public InteropField(string? name, Type? type, bool isStatic, object? value = null) 
		{
			Value = value;
			IsStatic = isStatic;
			Name = name;
			Type = type;
		}
	}
	
	public class InteropProperty 
	{
		public string? Name { get; private set; }
		public Type? Type { get; private set; }
		public bool IsStatic { get; private set; }
		public object? Value { get; private set; }
		
		public InteropProperty(string? name, Type? type, bool isStatic, object? value = null) 
		{
			Value = value;
			IsStatic = isStatic;
			Name = name;
			Type = type;
		}
	}
	
	public class InteropMethod 
	{
		/// <summary>
		/// Find and invoke a method based on the parameters given to it. Requirement to allow
		/// overloaded methods and caching the interoperability results at the same time in
		/// JavaScript.
		/// </summary>
		/// <param name="parameters"></param>
		/// <param name="typeParameters"></param>
		/// <param name="methods"></param>
		/// <returns></returns>
		public static async Task<(object?, Exception?)> FindAndInvoke(object[] parameters, object[] typeParameters, InteropMethod[] methods) 
		{
			var targetMethods = methods.Where(method => 
			{
				// Ensures that if the method is generic, the type parameters correctly fits to it
				var isMethodGeneric = method?._genericArguments?.Any() ?? false;
				
				if (isMethodGeneric)
				{
					if (!typeParameters.Any()) return false;
					if (typeParameters.Length != method?._genericArguments?.Length) return false;
					if (!Enumerable.SequenceEqual(typeParameters, method?._genericArguments ?? Array.Empty<Type>())) 
					{
						return false;
					}
				}

				// Checks if the parameters fits to properly invoke the method
				if (parameters.Length != method?._parameters?.Length) return false;
				
				var methodParameters = method?._parameters?.Select(parameter => parameter.Item2);
				var actualParameters = parameters.Select(parameter => parameter.GetType());
				if (!Enumerable.SequenceEqual(actualParameters, methodParameters ?? Array.Empty<Type>())) 
				{
					return false;
				}
				
				return true;
			});
			
			var method = targetMethods.FirstOrDefault();
			
			if (method == null) 
			{
				var error = new Exception("The target method does not exist with the current parameters");
				return (null, error);
			}
			
			return (await method.Invoke(parameters), null);
		}
		
		public string? Name { get; private set; }
		public bool IsAsync { get; private set; }
		public bool IsStatic { get; private set; } 
		public bool ReturnsVoid { get; private set; }
		
		/// <summary>
		/// Bind object is the instance where the method will
		/// be executed, can null in case of static methods.
		/// </summary>
		private readonly object? _bindObject;
		private (string?, Type?)[]? _parameters;
		private Type?[]? _genericArguments;
		private MethodInfo? _method;
		
		
		public Type?[]? GetGenericArguments() 
		{
			return _genericArguments;
		}
		
		public (string?, Type?)[]? GetParameters() 
		{
			return _parameters;
		}
		
		public async Task<object?> Invoke(object[] parameters) 
		{
			if (ReturnsVoid) 
			{
				_method?.Invoke(_bindObject, parameters);
				return null;
			}
			
			if (IsAsync) 
			{
				var taskObject = (Task<object?>?)_method?.Invoke(_bindObject, parameters);
				
				if (taskObject != null) 
				{
					return await taskObject;
				}
			}
			
			return _method?.Invoke(_bindObject, parameters);
		}
		
		public InteropMethod(
			string? name, 
			(string?, Type?)[]? parameters, 
			Type?[]? genericArguments, 
			MethodInfo? method,
			bool isAsync,
			bool isStatic,
			object? bindObject = null) 
		{
			Name = name;
			IsAsync = isAsync;
			IsStatic = isStatic;
			ReturnsVoid = _method?.ReturnType == typeof(void);
			
			_bindObject = bindObject;
			_parameters = parameters;
			_genericArguments = genericArguments;
			_method = method;
		}
	}
}