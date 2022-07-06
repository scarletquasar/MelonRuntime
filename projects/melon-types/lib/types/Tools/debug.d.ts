type Debug = {
    logs: [string, string][],
    log: (message: string) => void,
    details: (...args: any[]) => void,
    enableStackTracing: (enable: boolean) => void,
    enableDetailedInformation: boolean
}