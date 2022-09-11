import { DotnetFetchExpression } from "../../../types/dotnet/DotnetFetchExpression";

function _getStaticMethod<T>(expression: DotnetFetchExpression): (...args: any) => T {
    const parts = expression.split(":");
    const namespace = parts[0];
    const type = parts[1];
    const method = parts[2];

    const finalMethod = function (...args: any[]) {
        const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];
        return callStaticMethodBinding(namespace, type, method, [...args]);
    }

    return finalMethod;
}

export { _getStaticMethod }