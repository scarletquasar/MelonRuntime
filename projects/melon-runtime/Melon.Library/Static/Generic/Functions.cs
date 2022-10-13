using Jint.Native;
using Jint.Runtime.Interop;

namespace Melon.Library.Static.Generic
{
    public static class Functions
    {
        public static string StringifyFunction(Func<JsValue, JsValue[], JsValue> function)
        {
            var obj = (dynamic)function;

            if(obj.Target.GetType() != typeof(ClrFunctionInstance))
               return obj.Target.FunctionDeclaration.ToString();

            return "function() { [native code] }";
        }
    }
}
