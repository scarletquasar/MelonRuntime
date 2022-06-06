type Std = {
    shift: (value: any) => any,
    reflect: (target: any) => {
        name: string,
        modificator: Function,
        getValue: () => any,
    },
    system: {
        getBaseDirectory: () => string
    },
    sleep: (ms: number) => Promise<any>
}

/** std contains generic system functions and utilities */
declare const std: Std