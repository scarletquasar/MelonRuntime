declare interface IndexedArray<T> {
    length: number,
    indexes: Record<string, T[] | IndexedArray<T>>,
    push: (item: T) => void,
    asArray: () => T[],
    writeIndex: (name: string, filter: (this: T) => boolean, asIndexed: boolean) => void
}

declare function IndexedArray<T>(args: T[]): void