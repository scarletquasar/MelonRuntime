declare const std: {
    shift: (value: any) => shift,
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