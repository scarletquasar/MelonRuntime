
type Std = {
    Promise: (resolve: Function, reject?: Function) => void
    shift: (value: any) => any
    json: {
        tryParse: <T>(json: string, options: { onErrorReturn: (value: string) => T, modifier: (target: T) => T }) => T
        tryStringify: (
            target: any, 
            options: { onErrorReturn: (value: string) => string, modifier: (target: string) => string }
        ) => string
    },
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