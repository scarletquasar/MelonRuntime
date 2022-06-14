using Esprima.Ast;
using Newtonsoft.Json;

namespace MelonJs.Static.Tools.Functions
{
    public static class FunctionStringifier
    {
        public static string ToAstString(dynamic function)
        {
            if (function.Target.FunctionDeclaration?.GetType() == typeof(ArrowFunctionExpression))
            {
                return ToAstString((ArrowFunctionExpression)function.Target.FunctionDeclaration);
            }
            else if (function.Target.FunctionDeclaration?.GetType() == typeof(FunctionDeclaration))
            {
                return ToAstString((FunctionDeclaration)function.Target.FunctionDeclaration);
            }
            else
            {
                return ToAstString((FunctionExpression)function.Target.FunctionDeclaration);
            }
        }

        public static string ToAstString(ArrowFunctionExpression? function)
        {
            return JsonConvert.SerializeObject(function?.Body.DescendantNodes());
        }

        public static string ToAstString(FunctionDeclaration? function)
        {
            return JsonConvert.SerializeObject(function?.Body.DescendantNodes());
        }

        public static string ToAstString(FunctionExpression? function)
        {
            return JsonConvert.SerializeObject(function?.Body.DescendantNodes());
        }
    }
}
