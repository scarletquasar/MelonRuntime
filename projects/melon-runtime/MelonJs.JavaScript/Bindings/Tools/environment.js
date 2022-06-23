const environment = {
    getVariable: (name) => {
        return __environment__.GetEnvironmentVariables()[name] ?? __environment_vars__[name]
    },
    getVariables: () => {
        return Object.assign(__environment__.GetEnvironmentVariables()[name], __environment_vars__)
    },
    setVariable: (name, content) => {
        __environment_vars__.Add(name, content)
    },
    process: {
        getCurrentTime: (utc) => __environment_proccess__.GetCurrentTime(utc),
        getPlatform: () => __environment_proccess__.GetPlatform(),
        getMemoryUsage: () => __environment_proccess__.GetMemoryUsage(),
        setTitle: (title) => __environment_proccess__.SetTitle(title),
        kill: (name) => void __environment_proccess__.Kill(name),
    }
}