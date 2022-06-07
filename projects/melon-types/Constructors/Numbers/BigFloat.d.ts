declare type BigFloat = (number: number) => {
    value: number,
    getAsFloat: () => number,
    addRaw: (number: number) => void,
    add: (number: number) => void
}