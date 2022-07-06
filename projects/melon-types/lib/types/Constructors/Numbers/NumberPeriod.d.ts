declare interface NumberPeriod {
    getValue: (value: number) => number,
    setLimit: (unitLimit: number) => void
}

declare const NumberPeriod: (unitLimit: number) => void