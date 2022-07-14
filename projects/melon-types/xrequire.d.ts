declare type DotnetHandler = {
    getType: (type: string) => {
        getMethod: (method: string, index?: number) => {
            invoke: (parameters: any[], targetObject?: any) => any
        },
        getField: (field: string) => any,
        createInstance: (parameters: any) => any
    }
}

declare type DotnetAssignable = `dotnet:${string}`;
declare type DotnetExternalAssignable = `dotnet-external:${string}`;
declare function xrequire(target: DotnetAssignable): DotnetHandler;
declare function xrequire(target: DotnetExternalAssignable): DotnetHandler;