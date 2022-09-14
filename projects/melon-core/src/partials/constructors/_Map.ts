class _Map<TKey extends string | number | symbol, TValue> {
    #entries: Record<TKey, TValue>;
    size: number;

    constructor(baseEntries: [TKey, TValue][]) {
        this.#entries = {} as Record<TKey, TValue>;
        this.size = 0;

        if (baseEntries) {
            baseEntries.forEach(entry => {
                this.#entries[entry[0]] = entry[1];
            });
        }
    }

    entries() {
        return Object.entries(this.#entries);
    }

    has(key: TKey) {
        return this.#entries[key] != null;
    }

    set(key: TKey, value: TValue) {
        if (!this.has(key)) this.size++;
        this.#entries[key] = value;
    }

    get(key: TKey) {
        return this.#entries[key];
    }

    delete(key: TKey) {
        if (this.has(key)) this.size--;
        this.set(key, null);
    }

    keys() {
        return Object.keys(this.#entries);
    }

    values() {
        return Object.values(this.#entries);
    }

    forEach(callback: Function) {
        this.entries().forEach(x => callback(x[1], x[0], this));
    }
}

export { _Map }