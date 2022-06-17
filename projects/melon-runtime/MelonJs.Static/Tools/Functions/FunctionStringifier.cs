using Esprima.Ast;
using Newtonsoft.Json;
using MelonJs.Models.BuiltIn;

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
            JsFunction target = new()
            {
                Parameters = function?.Params.Count() ?? 0,
                Body = function?.Body.ChildNodes
            };

            return JsonConvert.SerializeObject(target);
        }

        public static string ToAstString(FunctionDeclaration? function)
        {
            JsFunction target = new()
            {
                Parameters = function?.Params.Count() ?? 0,
                Body = function?.Body.ChildNodes
            };

            return JsonConvert.SerializeObject(target);
        }

        public static string ToAstString(FunctionExpression? function)
        {
            JsFunction target = new()
            {
                Parameters = function?.Params.Count() ?? 0,
                Body = function?.Body.ChildNodes
            };

            return JsonConvert.SerializeObject(target);
        }
    }
}
