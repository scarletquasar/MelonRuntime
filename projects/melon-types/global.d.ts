declare const Melon: {
    std: {
        shift: () => {
            option: (condition: boolean, callback: () => unknown) => typeof Melon["std"]["shift"]
        },
        melon: {
            currentVersion: Version
        },
        boolean: {
            checkAll: <T>(method: Function, values: T[]) => boolean,
            checkOne: <T>(method: Function, values: T[]) => boolean
        },
        json: {
            tryParse: <T>(json: string) => T,
            tryStringify: () => <T>(target: T) => string
        },
        time: {
            setInterval: (callback: Function, delay: number) => void,
            setTimeout: (callback: Function, delay: number) => void
        },
        system: {
            osInformation: {
                platform: Platform,
                version: string,
                servicePack: string
            }
        },
        environmnet: {
            baseDirectory: string,
            getEnvironmentVariables: () => Record<string, any>,
            setEnvironmentVariable: (key: string, value: any) => void,
            clearLocalEnvironmentVariables: () => void
        },
        process: {
            argv: string[],
            env: Record<string, any>,
            exit: () => void
        }
    },
    http: {
        request: (
            target: string,
            method?: string,
            body?: Record<string, any>,
            headers?: Record<string, any>
        ) => Response,
        requestAsync: (
            target: string,
            method?: string,
            body?: Record<string, any>,
            headers?: Record<string, any>
        ) => Promise<Response>,
        app: (options: {
            name: string, 
            host: string,
            port: number,
            enableHttps: boolean
        }) => HttpApplication,
        result: (statusCode: number, response: any) => HttpComposedResponse,
        static: (response: any, type: `${string}/${string}`) => HttpComposedResponse
    },
    guards: {
        number: {
            isEven: (number: number) => boolean;
            isOdd: (number: number) => boolean;
            isInteger: (number: number) => boolean;
            isFloat: (number: number) => boolean;
        };
        iterable: {
            isEmptyArray: (array: any[]) => boolean;
            isEmptyObject: (object: Object) => boolean;
        };
        string: {
            isNullOrEmpty: (string: string) => boolean;
            isNullOrWhiteSpace: (string: string) => boolean;
        };
    },
    dotnet: {
        getStaticMethod: <T>(expression: DotnetFetchExpression) => (...args: any) => T,
        getStaticProperty: <T>(expression: DotnetFetchExpression) => T,
        loadAssembly: (path: string) => string,
        loadAssemblyAsync: (path: string) => Promise<string>,
        removeAssembly: (name: string) => void,
        getLoadedAssemblies: () => string[],
        types: {
            sbyte(value: number): TypedNumber,
            byte(value: number): TypedNumber,
            short(value: number): TypedNumber,
            ushort(value: number): TypedNumber,
            int(value: number): TypedNumber,
            uint(value: number): TypedNumber,
            long(value: number): TypedNumber,
            ulong(value: number): TypedNumber,
            float(value: number): TypedNumber,
            double(value: number): TypedNumber,
            decimal(value: number): TypedNumber
        },
        Realm: Realm
    },
    fs: {
        readText: (path: string) => string,
        writeText: (path: string, content: string) => void,
        readBytes: (path: string) => number[],
        writeBytes: (path: string, content: number[]) => void,
        readTextAsync: (path: string) => Promise<string>,
        writeTextAsync: (path: string, content: string) => Promise<void>,
        readBytesAsync: (path: string) => Promise<number[]>,
        writeBytesAsync: (path: string, content: number[]) => Promise<void>
    },
    data: {
        clone: (value: any) => any,
        compare: <T>(
            target: T, 
            value: T, 
            expression?: Function, 
            customModifier?: Function
        ) => {
            comment: string,
            equals: boolean
        },
        PgClient: DatabaseProviderConstructor,
        MySqlClient: DatabaseProviderConstructor,
        SqlServerClient: DatabaseProviderConstructor
    },
    Version: new(major: number, minor: number, patch: number) => {
        toString(): string;
    }
}

declare const console: Console;