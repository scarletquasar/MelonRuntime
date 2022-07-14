declare class Enumerable<T> {
    constructor(args: T[], capacity?: number);
    count: number;
    toArray: () => T[];
    take: (quantity: number) => Enumerable<T>;
    skip: (quantity: number) => Enumerable<T>;
    where: (filter: (target: T) => boolean) => Enumerable<T>;
    firstOrDefault: () => T | null;
    lastOrDefault: () => T | null;
    first: () => T;
    last: () => T;
    any: () => boolean;
    all: (condition: (target: T) => boolean) => boolean;
    average: () => T;
    cast: <T>(constructor: any) => Enumerable<T>;
    equals: (target: any) => boolean;
    add: (item: T) => void;
    addRange: (items: T[]) => void;
    clear: () => void;
}