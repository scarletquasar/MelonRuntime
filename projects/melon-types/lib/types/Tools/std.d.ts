type MWorker = {
    result: string,
    callback: Function,
    start: () => void
}

type Std = {
    shift: (value: any) => any,
    reflect: (target: any) => {
        name: string,
        modificator: Function,
        getValue: () => any,
    },
    system: {
        getBaseFolder: () => string
    },
    path: {
        getFolderPath: (fullPath: string) => string
    },
    workers: {
        add: (name: string, script: string, callback: Function) => void,
        get: (name: string) => MWorker,
        remove: (name: string) => void,
        clear: () => void
    },
    arguments: string[],
    object: (target: any) => {
        isTruthy(): boolean,
        isFalsy(): boolean,
        isEnumerable(): boolean,
        string: {
            putAt(expression: string, index: number): string 
        }
    }
}

/** std contains generic system functions and utilities */
declare const std: Std