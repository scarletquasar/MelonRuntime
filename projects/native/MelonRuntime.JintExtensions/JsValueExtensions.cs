using Jint;
using Jint.Native;
using Jint.Native.Error;
using Jint.Runtime.Interop;

namespace MelonRuntime.JintExtensions
{
	public static class JsValueExtensions
	{
		//TODO: re-implement without throwing capabilities
		public static IDictionary<string, object> AsDictionary(
			this JsValue target, 
			bool includeCallables = true)
		{
			var dictionary = new Dictionary<string, object>();

			using var shadowEngine = new Engine();
			shadowEngine.SetValue("target", target);
			shadowEngine.SetValue("dictionaryReferenceAdd", dictionary.Add);

			if(includeCallables)
			{
				shadowEngine.Execute(@"
					const entries = Object.entries(target);
					entries.forEach(entry => dictionaryReferenceAdd(entry[0], entry[1]));
				");

				return dictionary;
			}

			// Note: Calling default JSON.stringify/parse from Jint will remove all unreproducible values,
			// including functions, custom instances, promises, etc.
			shadowEngine.Execute(@"
				const stringified = JSON.stringify(target);
				const parsed = JSON.parse(stringified);

				const entries = Object.entries(parsed);
				entries.forEach(entry => dictionaryReferenceAdd(entry[0], entry[1]));
			");

			return dictionary;
		}

		//TODO: re-implement without throwing capabilities
		public static string AsFunctionString(this JsValue function)
		{
			var obj = (dynamic)function;

			if (obj.GetType() == typeof(ErrorConstructor))
			{
				return "function() { [Error] }";
			}

			if (obj.GetType() != typeof(ClrFunctionInstance))
			{
				return obj.FunctionDeclaration.ToString();
			}

			return "function() { [native code] }";
		}
	}
}
