import { Platform } from "../melon-core/types/std/Platform";
import { StdShiftOption } from "../melon-core/types/std/StdShiftOption";
import { Version } from "./Version";

type Std = {
    shift: (value: any) => StdShiftOption,
    melon: {
        currentVersion: Version,
        loadedModules: string[]
    },
    boolean: {
        checkAll: (method: Function, values: any[]) => boolean,
        checkOne: (method: Function, values: any[]) => boolean
    },
    json: {
        tryParse: <T>(json: string) => T,
        tryStringify: (target: any) => string
    },
    time: {
        setInterval: (action: Function, delay: number) => void,
        setTimeout: (action: Function, delay: number) => void
    }
    system: {
        osInformation: {
            platform: Platform,
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