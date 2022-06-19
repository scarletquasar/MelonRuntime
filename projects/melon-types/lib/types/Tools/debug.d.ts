type Debug = {
    logs: [string, string][],
    log: (message: string) => void,
    enableStackTracing: (enable: boolean) => void,
    enableDetailedInformation: boolean
}

declare const debug: Debug