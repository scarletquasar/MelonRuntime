using Jint.Native;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Melon.Library.Static.Generic
{
    public static class Functions
    {
        public static string StringifyFunction(Func<JsValue, JsValue[], JsValue> test)
        {
            return ((dynamic)test).Target.FunctionDeclaration.ToString()!;
        }
    }
}
