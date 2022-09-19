declare class _Set<T> {
    #private;
    size: number;
    constructor(baseEntries: T[]);
    entries(): T[][];
    has(value: T): boolean;
    add(value: T): void;
    delete(value: T): void;
    clear(): void;
    forEach(callback: (value: T, index: number, array: T[]) => void): void;
}
export { _Set };
