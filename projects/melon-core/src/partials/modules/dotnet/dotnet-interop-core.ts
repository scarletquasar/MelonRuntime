import { DotnetFetchExpression, InteropMethod } from "./dotnet-types";

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

function getFactories(namespace: string) {
    const types: any[] = _$internalBinding["GetTypes"](namespace);
    const activator = getStaticMethod("System:Activator:CreateInstance");
    const factories: Record<string, { new: (...args: any) => any }> = {};

    types.forEach(type => {
        const name = type.name[0].toLowerCase() + type.name.slice(1);

        factories[name] = {
            new: (...args: any) => {
                return activator(type, ...args);
            }
        }
    });
    
    return factories;
}

function loadAssembly(path: string) {
    _$internalBinding["LoadAssembly"](path);
}

function loadAssemblyAsync(path: string): Promise<void> {
    const task = _$internalBinding["LoadAssemblyAsync"](path);
    const promise = Promise.resolve(task.result);

    return promise;
}

function removeAssembly(fullName: string) {
    _$internalBinding["RemoveAssembly"](fullName)
}

function getLoadedAssemblies(): string[] {
    return _$internalBinding["GetLoadedAssemblies"];
}

function createList(array: any[]) {
    return _$internalBinding["CreateList"](array);
}

export { 
    getStaticMethod, 
    getStaticProperty, 
    getFactories,
    loadAssembly,
    loadAssemblyAsync,
    removeAssembly,
    getLoadedAssemblies,
    createList
}