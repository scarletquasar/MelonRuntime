declare interface Enumerable<T> {
    elements: () => T[],
    where: (filter: (this: T) => boolean) => Enumerable<T> ,
    top: (quantity: number) => Enumerable<T> ,
    bottom: (quantity: number) => Enumerable<T>,
    first: () => T,
    last: () => T,
    average: () => T,
    any: () => boolean,
    cast: (constructor: any) => Enumerable<any>,
    all: (condition: (this: T) => boolean) => boolean,
    add: (item: T) => void,
    addRange: (items: T[] | Enumerable<T>) => void,
    lookFor: (element: T) => any,
    compare: (element: T, compFn: (this: T) => boolean) => boolean,
    equals: (target: any) => boolean
}

declare function Enumerable<T>(args: T[]): void