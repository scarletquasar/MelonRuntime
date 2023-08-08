using System.Reflection;

//TODO: Work in progress class; Should not be used directly on the current modules.
namespace MelonRuntime.Core.Library.Reflection {
	/// <summary>
	/// Representation of an Assembly object in the interoperability context,
	/// capable of open and use the internal namespaces of it. Can be created
	/// from an external file. InteropAssembly
	/// may be used only for raw contexts inside JavaScript to CLR interoperability
	/// and is not useful as direct provider to get features from after the engine
	/// startup operation.
	/// </summary>
	public class InteropAssembly
	{
		public string? FullName { get; private set; }
		public string? FilePath { get; private set; }
		
		private Assembly? _assembly;
		private Type[]? _types;
		private bool _open;
		
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
			InteropNamespace[]? result = null;
			
			if (!_open)
			{
				error = new InvalidOperationException("The InteropAssembly was not initialized.");
				return (result, error);
			}
			
			var namespaces = _types?.Select(type => new InteropNamespace(type?.FullName, this));
			return (result, error);
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
					var interopClass = new InteropClass(
						fullName, 
						isStatic, 
						type.IsAbstract, 
						type.GetConstructors(),
						this,
						GetAssembly(),
						type);
						
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
			Type? type)	
		{
			FullName = fullName;
			IsStatic = isStatic;
			IsAbstract = isAbstract;
			
			_constructors = constructors;
			_namespace = @namespace;
			_assembly = assembly;
			_type = type;
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
		
	}
	
	public class InteropProperty 
	{
		
	}
	
	public class InteropMethod 
	{
		
	}
}