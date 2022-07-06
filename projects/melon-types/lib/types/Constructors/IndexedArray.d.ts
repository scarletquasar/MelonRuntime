declare class IndexedArrayConstructorInternal<T> implements Iterable<T> {
    [Symbol.iterator](): Iterator<T, any, undefined>;
    length: number;
    indexes: Record<string, T[] | IndexedArrayConstructorInternal<T>>;
    push: (item: T) => void;
    asArray: () => T[];
    writeIndex: (name: string, filter: (this: T) => boolean, asIndexed: boolean) => void;
}