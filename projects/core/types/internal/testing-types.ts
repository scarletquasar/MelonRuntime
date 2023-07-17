interface Assert {
    equals(expected: any, actual: any): void;
    true(target: boolean): void;
    false(target: boolean): void;
    truthy<T>(target: T): void;
    falsy<T>(target: T): void;
}

export { Assert }


