type Application = {
    end: () => void
    cache: {
        add: (key: string, value: any) => void,
        get: (key: string) => any,
        delete: (key: string) => void,
        clear: () => void,
        length: () => number
    },
    baseDir: () => string,
    name: string,
    description: string,
    author: string,
    version: string,
    website: string,
    entryPoint: string
}

declare const application: Application