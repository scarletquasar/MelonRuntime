declare type NumberPeriod = (unitLimit: number) => {
    getValue: (value: number) => number,
    setLimit: (unitLimit: number) => void
}