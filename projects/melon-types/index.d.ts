declare const Melon: {
    std: {
        shift: typeof import("./partials/modules/std/_shift")._shift;
        melon: {
            currentVersion: typeof import("./partials/constructors/_Version");
        };
        boolean: {
            checkAll: typeof import("./partials/modules/std/boolean/_checkAll")._checkAll;
            checkOne: typeof import("./partials/modules/std/boolean/_checkOne")._checkOne;
        };
        json: {
            tryParse: typeof import("./partials/modules/std/json/_tryParse")._tryParse;
            tryStringify: typeof import("./partials/modules/std/json/_tryStringify")._tryStringify;
        };
        time: {
            _timers: any[];
            setInterval: typeof import("./partials/modules/std/time/_setInterval")._setInterval;
            setTimeout: typeof import("./partials/modules/std/time/_setTimeout")._setTimeout;
        };
        system: {
            osInformation: {
                platform: import("./partials/modules/std/enums/Platform").Platform;
                version: string;
                servicePack: string;
            };
        };
        environment: {
            baseDirectory: string;
            getEnvironmentVariables: typeof import("./partials/modules/std/environment/_getEnvironmentVariables")._getEnvironmentVariables;
            setEnvironmentVariable: typeof import("./partials/modules/std/environment/_setEnvironmentVariable")._setEnvironmentVariable;
            clearLocalEnvironmentVariables: typeof import("./partials/modules/std/environment/_clearLocalEnvironmentVariables")._clearLocalEnvironmentVariables;
        };
        process: {
            argv: string[];
            env: Record<string, any>;
            exit: () => void;
        };
    };
    data: {
        clone: typeof import("./partials/modules/data/_clone")._clone;
        compare: typeof import("./partials/modules/data/_compare")._compare;
        PgClient: typeof import("./partials/modules/data/constructors/_PgClient")._PgClient;
        MySqlClient: typeof import("./partials/modules/data/constructors/_MySqlClient")._MySqlClient;
        SqlServerClient: typeof import("./partials/modules/data/constructors/_SqlServerClient")._SqlServerClient;
    };
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
    };
    fs: {
        readText: typeof import("./partials/modules/fs/_readText")._readText;
        writeText: typeof import("./partials/modules/fs/_writeText")._writeText;
        readBytes: typeof import("./partials/modules/fs/_readBytes")._readBytes;
        writeBytes: typeof import("./partials/modules/fs/_writeBytes")._writeBytes;
        readTextAsync: typeof import("./partials/modules/fs/_readTextAsync")._readTextAsync;
        writeTextAsync: typeof import("./partials/modules/fs/_writeTextAsync")._writeTextAsync;
        readBytesAsync: typeof import("./partials/modules/fs/_readBytesAsync")._readBytesAsync;
        writeBytesAsync: typeof import("./partials/modules/fs/_writeBytesAsync")._writeBytesAsync;
        deleteFile: typeof import("./partials/modules/fs/_deleteFile")._deleteFile;
        deleteFileAsync: typeof import("./partials/modules/fs/_deleteFileAsync")._deleteFileAsync;
        moveFile: typeof import("./partials/modules/fs/_moveFile")._moveFile;
        moveFileAsync: typeof import("./partials/modules/fs/_moveFileAsync")._moveFileAsync;
        copyFile: typeof import("./partials/modules/fs/_copyFile")._copyFile;
        renameFile: typeof import("./partials/modules/fs/_renameFile")._renameFile;
        renameFileAsync: typeof import("./partials/modules/fs/_renameFileAsync")._renameFileAsync;
        copyFileAsync: typeof import("./partials/modules/fs/_copyFileAsync")._copyFileAsync;
        createDirectory: typeof import("./partials/modules/fs/_createDirectory")._createDirectory;
        createDirectoryAsync: typeof import("./partials/modules/fs/_createDirectoryAsync")._createDirectoryAsync;
        deleteDirectory: typeof import("./partials/modules/fs/_deleteDirectory")._deleteDirectory;
        deleteDirectoryAsync: typeof import("./partials/modules/fs/_deleteDirectoryAsync")._deleteDirectoryAsync;
    };
    http: {
        _apps: {};
        request: typeof import("./partials/modules/http/_request")._request;
        requestAsync: typeof import("./partials/modules/http/_requestAsync")._requestAsync;
        app: typeof import("./partials/modules/http/_app")._app;
        result: typeof import("./partials/modules/http/_result")._result;
        static: typeof import("./partials/modules/http/_static")._static;
    };
    dotnet: {
        getStaticMethod: typeof import("./partials/modules/dotnet/_getStaticMethod")._getStaticMethod;
        getStaticProperty: typeof import("./partials/modules/dotnet/_getStaticProperty")._getStaticProperty;
        loadAssembly: (path: string) => string;
        removeAssembly: (fullName: string) => void;
        getLoadedAssemblies: () => string[];
        loadAsemblyAsync: typeof import("./partials/modules/dotnet/_loadAssemblyAsync")._loadAssemblyAsync;
        types: {
            sbyte: (number: number) => {
                type: string;
                value: number;
            };
            byte: (number: number) => {
                type: string;
                value: number;
            };
            short: (number: number) => {
                type: string;
                value: number;
            };
            ushort: (number: number) => {
                type: string;
                value: number;
            };
            int: (number: number) => {
                type: string;
                value: number;
            };
            uint: (number: number) => {
                type: string;
                value: number;
            };
            long: (number: number) => {
                type: string;
                value: number;
            };
            ulong: (number: number) => {
                type: string;
                value: number;
            };
            float: (number: number) => {
                type: string;
                number: number;
            };
            double: (number: number) => {
                type: string;
                number: number;
            };
            decimal: (number: number) => {
                type: string;
                number: number;
            };
        };
        Realm: typeof import("./partials/modules/dotnet/constructors/_Realm")._Realm;
    };
    crypto: {
        randomUUID(): string;
    };
    console: {
        log: typeof import("./partials/modules/console/_log")._log;
        write: typeof import("./partials/modules/console/_write")._write;
        writeLine: typeof import("./partials/modules/console/_writeLine")._writeLine;
        error: typeof import("./partials/modules/console/_error")._error;
        warn: typeof import("./partials/modules/console/_warn")._warn;
        clear: () => void;
        table: typeof import("./partials/modules/console/_table")._table;
    };
    Version: typeof import("./partials/constructors/_Version");
};

declare const console: typeof Melon.console;
declare const crypto: typeof Melon.crypto; 
