declare class IndexedArray<T> {
    constructor(arg: T[]);
    length: number;
    indexes: Record<string, T[] | IndexedArray<T>>;
    push: (item: T) => void;
    toArray: () => T[];
    writeIndex: (name: string, filter: (this: T) => boolean, asIndexed: boolean) => void;
}

declare function IndexedArray<T>(args: T[]): void;