type Environment = {
    getVariable: (name: string) => any,
    getVariables: () => Record<string, any>,
    setVariable: (name: string, content: any) => void
    process: {
        getCurrentTime: (utc: boolean) => string,
        getPlatform: () => string,
        getMemoryUsage: () => bigint,
        setTitle: (title: string) => string,
        kill: (name: string) => void,
    }
}

declare const environment: Environment