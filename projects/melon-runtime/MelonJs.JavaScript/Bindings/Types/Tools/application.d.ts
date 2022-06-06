type Application = {
    end: () => void
    cache: {
        add: (key: string, value: any) => void,
        get: (key: string) => any,
        delete: (key: string) => void,
        clear: () => void
    },
    name: string,
    description: string,
    author: string,
    version: string,
    website: string,
    entryPoint: string
}

/** application contains functionality related to the current application 
 * that is currently running as well as application cache management */
declare const application: Application