import { DotnetFetchExpression, InteropMethod } from "../../../../../types/internal/dotnet-interop-types";
import { OutputFriendly, Primitive, ScopedValue } from "../../../../../types/internal/generic-types";
import { Realm } from "./dotnet-realm-core";

const INVALID_NUMBER_CAPACITY = "The number capacity is invalid for that type";

const types = {
    sbyte: (number: number) => {
        if (number > 127 || number < -128) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "sbyte",
            value
        }
    },
    byte: (number: number) => {
        if (number > 255 || number < 0) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "byte",
            value
        }
    },
    short: (number: number) => {
        if (number > 32767 || number < -32768) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "short",
            value
        }
    },
    ushort: (number: number) => {
        if (number > 65535 || number < 0) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "ushort",
            value
        }
    },
    int: (number: number) => {
        if (number > 2147483647 || number < -2147483648) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "int",
            value
        }
    },
    uint: (number: number) => {
        if (number > 4294967295 || number < 0) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "uint",
            value
        }
    },
    long: (number: number) => {
        if (number > 9223372036854775807 || number < -9223372036854775808) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "long",
            value
        }
    },
    ulong: (number: number) => {
        if (number > 18446744073709551615 || number < 0) {
            throw new RangeError(INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "ulong",
            value
        }
    },
    float: (number: number) => {
        return {
            type: "float",
            number
        }
    },
    double: (number: number) => {
        return {
            type: "double",
            number
        }
    },
    decimal: (number: number) => {
        return {
            type: "decimal",
            number
        }
    }
}

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
    createList,
    types
}