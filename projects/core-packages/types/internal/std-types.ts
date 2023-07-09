interface SharedBag<T> {
    beginTransaction(): string;
    closeTransaction(): void;
    addFirst(item: T): number;
    addLast(item: T): number;
}

type SharedBagConstructor = new <T>(...content: T[]) => SharedBag<T>;

export { SharedBag, SharedBagConstructor }