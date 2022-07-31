type Dotnet = {
    getStaticMethod: <TFunctionReturn>(expression: `${string}:${string}:${string}`) => (...args: any) => TFunctionReturn,
    getStaticProperty: <TProperty>(expression: `${string}:${string}:${string}`) => TProperty,
    loadAssembly: (path: string) => string,
    removeAssembly: (path: string) => void,
    getAssemblies: (path: string) => (string | null)[]
}

declare const dotnet: Dotnet;