import { JsonTryParseOptions } from "./types/std/JsonTryParseOptions";
import { JsonTryStringifyOptions } from "./types/std/JsonTryStringifyOptions";

declare namespace Promise {
    interface PromisePolyfillConstructor extends PromiseConstructor {
        _immediateFn?: ((handler: (() => void) | string) => void) | undefined;
    }
}

type Std = {
    melon: {
        loadedModules: string[]
    },
    Promise: Promise.PromisePolyfillConstructor,
    shift: (value: any) => any,
    json: {
        tryParse: <T>(json: string, options: JsonTryParseOptions<T>) => T
        tryStringify: (target: any, options: JsonTryStringifyOptions) => string
    },
    time: {
        setInterval: (action: Function, delay: number) => void,
        setTimeout: (action: Function, delay: number) => void
    }
    system: {
        osInformation: {
            platform: number
            version: string,
            servicePack: string
        }
    },
    environment: {
        baseDirectory: string
        getEnvironmentVariables: () => Record<string, any>
        setEnvironmentVariable: (key: string, value: any) => void
        clearLocalEnvironmentVariables: () => void
    },
    process: {
        argv: string[]
        exit: () => void
        env: Record<string, any>
    }
}

declare const std: Std;