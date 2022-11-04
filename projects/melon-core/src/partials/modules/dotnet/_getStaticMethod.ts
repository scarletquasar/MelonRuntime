import { DotnetFetchExpression } from "../../../types/dotnet/DotnetFetchExpression";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError";

/* Melon.dotnet.getStaticMethod(expression: string)
/  Returns (if exists) the expression-equivalent static method 
/  as a wrapped JavaScript method with free arguments - allowing
/  to get any overload of that method. Will not work with generic
/  methods.
*/
function _getStaticMethod<T>(expression: DotnetFetchExpression): (...args: any) => T {
    const parts = expression.split(":");
    const namespace = parts[0];
    const type = parts[1];
    const method = parts[2];

    if(parts.includes(null) || parts.includes("")) {
        const causes = parts.filter(part => part === null || part === "");
    
        throw new InvalidArgumentError(...causes);
    }

    const finalMethod = function (...args: any[]) {
        const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];
        return callStaticMethodBinding(namespace, type, method, [...args]);
    }

    return finalMethod;
}

export { _getStaticMethod }