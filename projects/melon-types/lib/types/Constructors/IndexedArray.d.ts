declare interface IndexedArray<T> extends Iterable<T> {
    length: number,
    indexes: Record<string, T[] | IndexedArray<T>>,
    push: (item: T) => void,
    asArray: () => T[],
    writeIndex: (name: string, filter: (this: T) => boolean, asIndexed: boolean) => void
}

declare function IndexedArray<T>(args: Iterable<T>): void