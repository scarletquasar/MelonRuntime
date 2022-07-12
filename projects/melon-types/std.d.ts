
type Std = {
    Promise: (resolve: Function, reject?: Function) => void
    shift: (value: any) => any
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