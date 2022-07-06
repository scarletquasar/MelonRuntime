
declare type DotnetHandler = {
    getType: (type: string) => {
        getMethod: (method: string) => {
            invoke: (parameters: any[], targetObject?: any) => any
        },
        getField: (field: string) => any,
        createInstance: (parameters: any) => any
    }
}

declare type DotnetAssignable = `dotnet:${string}`;
declare type DotnetExternalAssignable = `dotnet-external:${string}`;