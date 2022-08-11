import { JsonTryParseOptions } from "./types/std/JsonTryParseOptions";
import { JsonTryStringifyOptions } from "./types/std/JsonTryStringifyOptions";
import { StdShiftOption } from "./types/std/StdShiftOption";
import { Version } from "./Version";

type Std = {
    shift: <T>(value: T) => StdShiftOption<T>,
    melon: {
        currentVersion: Version,
        loadedModules: string[]
    },
    boolean: {
        checkAll: (method: Function, values: any[]) => boolean,
        checkOne: (method: Function, values: any[]) => boolean
    },
    json: {
        tryParse: <T>(json: string, options: JsonTryParseOptions<T>) => T,
        tryStringify: (target: any, options: JsonTryStringifyOptions) => string
    },
    time: {
        setInterval: (action: Function, delay: number) => void,
        setTimeout: (action: Function, delay: number) => void
    }
    system: {
        osInformation: {
            platform: number,
            version: string,
            servicePack: string
        }
    },
    environment: {
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
}

declare const std: Std;