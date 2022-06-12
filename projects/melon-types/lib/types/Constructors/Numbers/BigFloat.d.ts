declare interface BigFloat {
    value: number,
    getAsFloat: () => number,
    addRaw: (number: number) => void,
    add: (number: number) => void
}