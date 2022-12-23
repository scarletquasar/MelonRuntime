import { DotnetFetchExpression } from "../../../types/dotnet/DotnetFetchExpression";

function getStaticMethod<T>(expression: DotnetFetchExpression): (...args: any) => T {
    const parts = expression.split(":");

    const finalMethod = function (...args: any[]) {
        const callStaticMethodBinding = _$internalBinding["CallStaticMethod"];
        return callStaticMethodBinding(parts[0], parts[1], parts[2], [...args]);
    }

    return finalMethod;
}

export { getStaticMethod }