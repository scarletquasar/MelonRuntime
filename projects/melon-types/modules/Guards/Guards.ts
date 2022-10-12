declare type Guards = {
    number: {
        isEven: (number: number) => boolean;
        isOdd: (number: number) => boolean;
        isInteger: (number: number) => boolean;
        isFloat: (number: number) => boolean;
    };
    iterable: {
        isEmptyArray: (array: any[]) => boolean;
        isEmptyObject: (object: Object) => boolean;
    };
    string: {
        isNullOrEmpty: (string: string) => boolean;
        isNullOrWhiteSpace: (string: string) => boolean;
    };
}