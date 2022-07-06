declare interface NumberPeriodConstructorInternal {
    getValue: (value: number) => number,
    setLimit: (unitLimit: number) => void
}

declare const NumberPeriod: (unitLimit: number) => void