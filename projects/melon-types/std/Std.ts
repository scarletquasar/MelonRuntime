import { Version } from "../constructors/Version"
import { Platform } from "./Platform"

type Std = {
    shift: () => {
        option: (condition: boolean, callback: () => unknown) => Std["shift"]
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
}

export { Std }