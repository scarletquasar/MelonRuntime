// Console types
declare type ConsoleColor = import("./internal/console-types").ConsoleColor;
// Generic types
declare type Primitive = import("./internal/generic-types").Primitive;
declare type OutputFriendly = import("./internal/generic-types").OutputFriendly;
// System types
declare type InternalOSVersion = import("./internal/system-types").InternalOSVersion;
declare type Platform = import("./internal/system-types").Platform;
// Http types
declare type HttpComposedResponse = import("./internal/http-types").HttpComposedResponse;
declare type HttpResponse = import("./internal/http-types").HttpResponse;
declare type HttpRequest = import("./internal/http-types").HttpRequest;
declare type CallbackFunction = import("./internal/http-types").CallbackFunction;
declare type AsyncCallbackFunction = import("./internal/http-types").AsyncCallbackFunction;
declare type CorsOptions = import("./internal/http-types").CorsOptions;
declare type HttpResult<T> = import("./internal/http-types").HttpResult<T>;
declare type HttpEndpoint = import("./internal/http-types").HttpEndpoint;
declare type HttpApplication = import("./internal/http-types").HttpApplication;
declare type HttpApplicationOptions = import("./internal/http-types").HttpApplicationOptions;
// Dotnet interoperability types
declare type InteropMethod<T> = import ("./internal/dotnet-interop-types").InteropMethod<T>;
declare type DotnetFetchExpression = import ("./internal/dotnet-interop-types").DotnetFetchExpression;
declare type DotnetGetStaticMethodResult<T> = import ("./internal/dotnet-interop-types").DotnetGetStaticMethodResult<T>;
declare type DotnetInstanceExpression = import ("./internal/dotnet-interop-types").DotnetInstanceExpression;
declare type DotnetNumericTypes = import ("./internal/dotnet-interop-types").DotnetNumericTypes
declare type TypedNumber = import ("./internal/dotnet-interop-types").TypedNumber
// Database types
declare type DatabaseProviderInternal = import ("./internal/database-types").DatabaseProviderInternal;
declare type DatabaseProviderOptions = import ("./internal/database-types").DatabaseProviderOptions;
// Crypto types
declare type UUID = import("./internal/generic-types").UUID;

// Structural types
declare type MelonStandardApi = {
    console: {
        log: import ("./structural/console-structural-types").ConsoleLog,
        write: import ("./structural/console-structural-types").ConsoleWrite,
        writeLine: import ("./structural/console-structural-types").ConsoleWriteLine,
        warn: import ("./structural/console-structural-types").ConsoleWarning,
        error: import ("./structural/console-structural-types").ConsoleError,
        table: import ("./structural/console-structural-types").ConsoleTable,
        time: import ("./structural/console-structural-types").ConsoleTime,
        timeEnd: import ("./structural/console-structural-types").ConsoleTimeEnd,
    },
    data: {
        clone: import ("./structural/data-structural-types").DataClone,
        compare: import ("./structural/data-structural-types").DataCompare,
        PgClient: import ("./structural/data-structural-types").DataMySqlClient,
        MySqlClient: import ("./structural/data-structural-types").DataPgClient,
        SqlServer: import ("./structural/data-structural-types").DataSqlServerClient,
        PgDocumentClient: import ("./structural/data-structural-types").DataPgDocumentClient
    },
    guards: {
        number: {
            isEven(target: number): boolean,
            isOdd(target: number): boolean,
            isInteger(target: number): boolean,
            isFloat(target: number): boolean,
        },
        iterable: {
            isEmptyArray(target: any[]): boolean,
            isEmptyObject(target: Object): boolean
        },
        string: {
            isNullOrEmpty(target: string): boolean,
            isNullOrWhiteSpace(target: string): boolean,
        }
    },
    fs: {
        readText: import("./structural/fs-structural-types").FsReadText,
        writeText: import("./structural/fs-structural-types").FsWriteText,
        readBytes: import("./structural/fs-structural-types").FsReadBytes,
        writeBytes: import("./structural/fs-structural-types").FsWriteBytes,
        readTextAsync: import("./structural/fs-structural-types").FsReadTextAsync,
        writeTextAsync: import("./structural/fs-structural-types").FsWriteTextAsync,
        readBytesAsync: import("./structural/fs-structural-types").FsReadBytesAsync,
        writeBytesAsync: import("./structural/fs-structural-types").FsWriteBytesAsync,
        deleteFile: import("./structural/fs-structural-types").FsDeleteFile,
        deleteFileAsync: import("./structural/fs-structural-types").FsDeleteFileAsync,
        moveFile: import("./structural/fs-structural-types").FsMoveFile,
        moveFileAsync: import("./structural/fs-structural-types").FsMoveFileAsync,
        copyFile: import("./structural/fs-structural-types").FsCopyFile,
        copyFileAsync: import("./structural/fs-structural-types").FsCopyFileAsync,
        renameFile: import("./structural/fs-structural-types").FsRenameFile,
        renameFileAsync: import("./structural/fs-structural-types").FsRenameFileAsync,
        createDirectory: import("./structural/fs-structural-types").FsCreateDirectory,
        createDirectoryAsync: import("./structural/fs-structural-types").FsCreateDirectoryAsync,
        deleteDirectory: import("./structural/fs-structural-types").FsDeleteDirectory,
        deleteDirectoryAsync: import("./structural/fs-structural-types").FsDeleteDirectoryAsync,
        renameDirectory: import("./structural/fs-structural-types").FsRenameDirectory,
        renameDirectoryAsync: import("./structural/fs-structural-types").FsRenameDirectoryAsync
    },
    dotnet: {
        Realm: import("./internal/dotnet-realm-types").RealmConstructor,
        getFactories: import("./structural/dotnet-structural-types").DotnetGetFactories,
        getStaticMethod: import("./structural/dotnet-structural-types").DotnetGetStaticMethod,
        getStaticProperty: import("./structural/dotnet-structural-types").DotnetGetStaticProperty,
        loadAssembly: import("./structural/dotnet-structural-types").DotnetLoadAssembly,
        loadAssemblyAsync: import("./structural/dotnet-structural-types").DotnetLoadAssemblyAsync,
        removeAssembly: import("./structural/dotnet-structural-types").DotnetRemoveAssembly,
        getLoadedAssemblies: import("./structural/dotnet-structural-types").DotnetGetLoadedAssemblies,
        createList: import("./structural/dotnet-structural-types").DotnetCreateList    
    },
    crypto: {
        randomUUID(): UUID,
    },
    runtime: {
        Event: import("./internal/runtime-types").EventConstructor,
        EventChain: import("./internal/runtime-types").EventChainConstructor,
        eventChain: import("./internal/runtime-types").EventChain
    },
    testing: {
        test: import("./structural/testing-structural-types").TestingTest
    },
    http: {
        requestSync: import("./structural/http-structural-types").HttpRequestSync,
        fetch: import("./structural/http-structural-types").HttpFetch,
        requestAsync: import("./structural/http-structural-types").HttpRequestAsync,
        result: import("./structural/http-structural-types").HttpFuncResult,
        static: import("./structural/http-structural-types").HttpFuncStatic,
        app: import("./structural/http-structural-types").HttpFuncApp,
    },
    std: {
        SharedBag: import("./internal/std-types").SharedBagConstructor;
        TextDecoder: any;
        TextEncoder: any;
        shift: any;
        async: {
          nextTick: any;
        };
        melon: {
          currentVersion: any;
        };
        boolean: {
          checkAll: any;
          checkOne: any;
        };
        json: {
          tryParse: any;
          tryStringify: any;
          deserialize: any;
          serialize: any;
          tryDeserialize: any;
          trySerialize: any;
        };
        time: {
          _timers: any[];
          setInterval: any;
          setTimeout: any;
          clearTimeout: any;
          clearInterval: any;
          Timer: any;
        };
        system: {
          osInformation: any;
        };
        environment: {
          baseDirectory: any;
          getEnvironmentVariables: any;
          setEnvironmentVariable: any;
          clearLocalEnvironmentVariables: any;
        };
        process: {
          argv: any;
          env: any;
          exit: any;
        };
    }
}

declare const Melon: MelonStandardApi;