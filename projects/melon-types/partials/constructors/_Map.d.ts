declare class _Map<TKey extends string | number | symbol, TValue> {
    #private;
    size: number;
    constructor(baseEntries: [TKey, TValue][]);
    entries(): [string, unknown][];
    has(key: TKey): boolean;
    set(key: TKey, value: TValue): void;
    get(key: TKey): Record<TKey, TValue>[TKey];
    delete(key: TKey): void;
    keys(): string[];
    values(): unknown[];
    forEach(callback: Function): void;
}
export { _Map };
