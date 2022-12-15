import { DotnetFetchExpression } from "../../../types/dotnet/DotnetFetchExpression";

function _getStaticProperty<T>(expression: DotnetFetchExpression): T {
    const parts = expression.split(":");
    const namespace = parts[0];
    const type = parts[1];
    const property = parts[2];

    const callStaticPropertyBinding = _$internalBinding["GetStaticProperty"];
    const internalStaticProperty = callStaticPropertyBinding(namespace, type, property);

    return internalStaticProperty;
}

export { _getStaticProperty }