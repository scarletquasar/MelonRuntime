declare class EnumerableConstructorInternal<T> extends Array<T> {
    constructor(args: Iterable<T>, capacity?: number);
    count: number;
    toArray: () => T[];
    take: (quantity: number) => EnumerableConstructorInternal<T>;
    skip: (quantity: number) => EnumerableConstructorInternal<T>;
    where: (filter: (target: T) => boolean) => EnumerableConstructorInternal<T>;
    firstOrDefault: () => T | null;
    lastOrDefault: () => T | null;
    first: () => T;
    last: () => T;
    any: () => boolean;
    all: (condition: (target: T) => boolean) => boolean;
    average: () => T;
    cast: <T>(constructor: any) => EnumerableConstructorInternal<T>;
    equals: (target: any) => boolean;
    add: (item: T) => void;
    addRange: (items: Iterable<T>) => void;
    clear: () => void;
}