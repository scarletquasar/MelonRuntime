const _guards = {
    number: {
        isEven: (number: number) => number % 2 == 0,
        isOdd: (number: number) => !_guards.number.isEven(number),
        isInteger: (number: number) => Number.isInteger(number),
        isFloat: (number: number) => !(number % 1 === 0)
    },
    iterable: {
        isEmptyArray: (array: any[]) => array.length === 0,
        isEmptyObject: (object: Object) => _guards.iterable.isEmptyArray(Object.keys(object))
    },
    string: {
        isNullOrEmpty: (string: string) => string === null || string.length === 0,
        isNullOrWhiteSpace: (string: string) => string === null || string.trim().length === 0
    }
}

export { _guards }