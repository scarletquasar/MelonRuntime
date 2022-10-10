declare type _environment = {
    baseDirectory: string,
    getEnvironmentVariables: () => Record<string, any>,
    setEnvironmentVariable: (key: string, value: any) => void,
    clearLocalEnvironmentVariables: () => void
}