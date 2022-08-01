type IndexedArrayIndexUnit<T> = Record<string, T[] | IndexedArray<T>>;

declare class IndexedArray<T> {
    constructor(arg: T[]);
    length: number;
    indexes: IndexedArrayIndexUnit<T>;
    push: (item: T) => void;
    toArray: () => T[];
    writeIndex: (name: string, filter: (this: T) => boolean, asIndexed: boolean) => void;
}