declare namespace Promise {
    interface PromisePolyfillConstructor extends PromiseConstructor {
        _immediateFn?: ((handler: (() => void) | string) => void) | undefined;
    }
}

type JsonTryParseOptions<T> = { 
    onErrorReturn: (value: string) => T, 
    modifier: (target: T) => T 
}

type JsonTryStringifyOptions = { 
    onErrorReturn: (value: string) => string, 
    modifier: (target: string) => string 
}

type Std = {
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
            platform: string
            version: string,
            servicePack: string
        }
    },
    environment: {
        currentDirectory: string
        baseDirectory: () => string
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