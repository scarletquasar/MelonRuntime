type Dotnet = {
    getStaticMethod: (expression: `${string}:${string}:${string}`, index: number) => Function,
    getStaticField: <T>(expression: `${string}:${string}:${string}`) => T
}

declare const dotnet: Dotnet;