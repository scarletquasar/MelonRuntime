using System.Runtime.CompilerServices;
using System.Reflection;
using System.Collections.Specialized;

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
	/// startup operation.
	/// </summary>
	public static class Interoperability 
	{
		private static HybridDictionary? _assemblyMemo;	
		private static HybridDictionary? _typeMemo;
		
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
			var domainAssemblies = AppDomain.CurrentDomain
				.GetAssemblies()
				.Select(assembly => new InteropAssembly(
					assembly, 
					assembly.GetTypes()))
				.ToArray();
					
			foreach (var assembly in domainAssemblies)
			{
				var name = Guid.NewGuid().ToString();
				_assemblyMemo?.Add(name, (assembly.FullName ?? "", assembly));
			}
			
			// netstandard
			var assemblyNetstandard = Assembly.Load("netstandard");
			var interopNetstandard = new InteropAssembly(
				assemblyNetstandard,
				assemblyNetstandard.GetTypes(), 
				"netstandard");
				
			// System
			var assemblySystem = Assembly.Load("System");
			var interopSystem = new InteropAssembly(
				assemblySystem, 
				assemblySystem.GetTypes(), 
				"System");
				
			// System.Runtime
			var assemblySystemRuntime = Assembly.Load("System.Runtime");
			var interopSystemRuntime = new InteropAssembly(
				assemblySystemRuntime, 
				assemblySystemRuntime.GetTypes(), 
				"System.Runtime");
				
			// System.Console
			var assemblySystemConsole = Assembly.Load("System.Console");
			var interopSystemConsole = new InteropAssembly(
				assemblySystemConsole, 
				assemblySystemConsole.GetTypes(), 
				"System.Console");
				
			// System.Text.Json
			var assemblySystemTextJson = Assembly.Load("System.Text.Json");
			var interopSystemTextJson = new InteropAssembly(
				assemblySystemTextJson, 
				assemblySystemTextJson.GetTypes(), 
				"System.Text.Json.dll");
				
			// System.Net.Http
			var assemblySystemNetHttp = Assembly.Load("System.Net.Http");
			var interopSystemNetHttp = new InteropAssembly(
				assemblySystemNetHttp, 
				assemblySystemNetHttp.GetTypes(), 
				"System.Net.Http.dll");
				
			// System.Diagnostics.Process
			var assemblySystemDiagnosticsProcess = Assembly.Load("System.Diagnostics.Process");
			var interopSystemDiagnosticsProcess = new InteropAssembly(
				assemblySystemDiagnosticsProcess, 
				assemblySystemDiagnosticsProcess.GetTypes(), 
				"System.Diagnostics.Process.dll");
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
								isAsync);
						})
						.ToArray();
						
					var fields = type
						.GetFields()
						.Select(field => new InteropField(field.Name, field.FieldType))
						.ToArray();
						
					var properties = type
						.GetProperties()
						.Select(field => new InteropProperty(field.Name, field.PropertyType))
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
		public Type? Type;
		
		public InteropField(string? name, Type? type) 
		{
			Name = name;
			Type = type;
		}
	}
	
	public class InteropProperty 
	{
		public string? Name { get; private set; }
		public Type? Type;
		
		public InteropProperty(string? name, Type? type) 
		{
			Name = name;
			Type = type;
		}
	}
	
	public class InteropMethod 
	{
		public string? Name { get; private set; }
		public bool IsAsync { get; private set; }
		
		private (string?, Type?)[]? _parameters;
		private Type?[]? _genericArguments;
		private MethodInfo? _method;
		
		public InteropMethod(
			string? name, 
			(string?, Type?)[]? parameters, 
			Type?[]? genericArguments, 
			MethodInfo? method,
			bool isAsync) 
		{
			Name = name;
			IsAsync = isAsync;
			
			_parameters = parameters;
			_genericArguments = genericArguments;
			_method = method;
		}
	}
}