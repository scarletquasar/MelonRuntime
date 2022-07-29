type Dotnet = {
    getStaticMethod: <TFunctionReturn>(expression: `${string}:${string}:${string}`) => (...args: any) => TFunctionReturn,
    getStaticProperty: <TProperty>(expression: `${string}:${string}:${string}`) => TProperty
}

declare const dotnet: Dotnet;