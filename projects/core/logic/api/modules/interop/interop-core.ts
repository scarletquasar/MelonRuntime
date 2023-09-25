import { DotnetFetchExpression, InteropMethod } from "types/internal/dotnet-interop-types";
import { Result } from "../stdlib/functional-core";

function getExpParts(expression: string) {
    return expression.split(":");
}

function getStaticMethod<T>(expression: DotnetFetchExpression): Result<Error, InteropMethod<T>> {
    const parts = getExpParts(expression);
    const method = (...args: unknown[]) => {
        return _$internalBinding["CallStaticMethod"](
            parts[0], 
            parts[1], 
            parts[2], 
            [...args]
        );
    }

    return Result.right(method);
}

function getStaticProperty<T>(expression: DotnetFetchExpression): Result<Error, T> {
    const parts = getExpParts(expression);
    const property = _$internalBinding["GetStaticProperty"](
        parts[0], 
        parts[1], 
        parts[2]
    );

    return Result.right(property);
}

function loadAssembly(path: string): Result<Error, []> {
    _$internalBinding["LoadAssembly"](path);
    return Result.right([]);
}

export {
    getStaticMethod, 
    getStaticProperty,
    loadAssembly
}