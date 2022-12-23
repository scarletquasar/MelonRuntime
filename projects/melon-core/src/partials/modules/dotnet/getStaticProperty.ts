import { DotnetFetchExpression } from "../../../types/dotnet/DotnetFetchExpression";

function getStaticProperty<T>(expression: DotnetFetchExpression): T {
    const parts = expression.split(":");

    const callStaticPropertyBinding = _$internalBinding["GetStaticProperty"];
    const internalStaticProperty = callStaticPropertyBinding(parts[0], parts[1], parts[2]);

    return internalStaticProperty;
}

export { getStaticProperty }