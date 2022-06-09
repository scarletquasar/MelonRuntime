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
    }
}

/** std contains generic system functions and utilities */
declare const std: Std