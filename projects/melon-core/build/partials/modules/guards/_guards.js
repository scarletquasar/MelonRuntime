const _guards = {
    number: {
        isEven: (number) => number % 2 == 0,
        isOdd: (number) => !_guards.number.isEven(number),
        isInteger: (number) => Number.isInteger(number),
        isFloat: (number) => !(number % 1 === 0)
    },
    iterable: {
        isEmptyArray: (array) => array.length === 0,
        isEmptyObject: (object) => _guards.iterable.isEmptyArray(Object.keys(object))
    },
    string: {
        isNullOrEmpty: (string) => string === null || string.length === 0,
        isNullOrWhiteSpace: (string) => string === null || string.trim().length === 0
    }
};
export { _guards };
