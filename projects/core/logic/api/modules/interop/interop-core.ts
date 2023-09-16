import { DotnetFetchExpression, InteropMethod } from "types/internal/dotnet-interop-types";

function getExpParts(expression: string) {
    return expression.split(":");
}

function getStaticMethod<T>(expression: DotnetFetchExpression): InteropMethod<T> {
    const parts = getExpParts(expression);
    const method = (...args: unknown[]) => {
        return _$internalBinding["CallStaticMethod"](
            parts[0], 
            parts[1], 
            parts[2], 
            [...args]
        );
    }

    return method;
}

function getStaticProperty<T>(expression: DotnetFetchExpression): T {
    const parts = getExpParts(expression);
    const property = _$internalBinding["GetStaticProperty"](
        parts[0], 
        parts[1], 
        parts[2]
    );

    return property;
}

function loadAssembly(path: string) {
    _$internalBinding["LoadAssembly"](path);
}

export {
    getStaticMethod, 
    getStaticProperty,
    loadAssembly
}