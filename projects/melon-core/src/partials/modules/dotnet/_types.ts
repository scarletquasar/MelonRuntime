import { _internalConsts } from "../internalConsts/_internalConsts";

const _types = {
    sbyte: (number: number) => {
        if (number > 127 || number < -128) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "sbyte",
            value
        }
    },
    byte: (number: number) => {
        if (number > 255 || number < 0) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "byte",
            value
        }
    },
    short: (number: number) => {
        if (number > 32767 || number < -32768) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "short",
            value
        }
    },
    ushort: (number: number) => {
        if (number > 65535 || number < 0) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "ushort",
            value
        }
    },
    int: (number: number) => {
        if (number > 2147483647 || number < -2147483648) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "int",
            value
        }
    },
    uint: (number: number) => {
        if (number > 4294967295 || number < 0) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "uint",
            value
        }
    },
    long: (number: number) => {
        if (number > 9223372036854775807 || number < -9223372036854775808) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "long",
            value
        }
    },
    ulong: (number: number) => {
        if (number > 18446744073709551615 || number < 0) {
            throw new RangeError(_internalConsts.INVALID_NUMBER_CAPACITY);
        }

        const value = Math.floor(number);

        return {
            type: "ulong",
            value
        }
    },
    float: (number: number) => {
        return {
            type: "float",
            number
        }
    },
    double: (number: number) => {
        return {
            type: "double",
            number
        }
    },
    decimal: (number: number) => {
        return {
            type: "decimal",
            number
        }
    }
}

export { _types }