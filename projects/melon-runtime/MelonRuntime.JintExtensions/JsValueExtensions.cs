using Jint;
using Jint.Native;
using Jint.Native.Error;
using Jint.Runtime.Interop;

namespace MelonRuntime.JintExtensions
{
    public static class JsValueExtensions
    {
        public static IDictionary<string, object> AsDictionary(this JsValue target, bool includeCallables = true)
        {
            var dictionary = new Dictionary<string, object>();

            using var shadowEngine = new Engine();
            shadowEngine.SetValue("target", target);
            shadowEngine.SetValue("dictionaryReferenceAdd", dictionary.Add);

            var elementsScript = @"
                const entries = Object.entries(target);
                const functions = entries.filter(x => x[1] instanceof Function);
                const promises = entries.filter(x => x[1] instanceof Promise);

                entries.forEach(entry => dictionaryReferenceAdd(entry[0], entry[1]));
            ";

            var callablesScript = @"
                promises.forEach(entry => dictionaryReferenceAdd(entry[0], entry[1]));
                functions.forEach(entry => dictionaryReferenceAdd(entry[0], entry[1]));
            ";

            shadowEngine.Execute(elementsScript + (includeCallables ? callablesScript : ""));

            return dictionary;
        }

        public static string AsFunctionString(this JsValue function)
        {
            var obj = (dynamic)function;

            if (obj.Target.GetType() == typeof(ErrorConstructor))
            {
                return "function() { [Error] }";
            }

            if (obj.Target.GetType() != typeof(ClrFunctionInstance))
            {
                return obj.Target.FunctionDeclaration.ToString();
            }

            return "function() { [native code] }";
        }
    }
}
