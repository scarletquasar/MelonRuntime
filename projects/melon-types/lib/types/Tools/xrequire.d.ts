
declare type DotnetInternal = {
    getType: (type: string) => {
        getMethod: (method: string) => {
            invoke: (parameters: any[], targetObject?: any) => any
        },
        getField: (field: string) => any,
        createInstance: (parameters: any) => any
    }
}

declare type DotnetAssignable = `dotnet:${string}` 
declare function xrequire(target: DotnetAssignable): DotnetInternal