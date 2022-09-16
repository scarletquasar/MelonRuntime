class _Set<T> {
    #entries: T[];
    size: number;

    constructor(baseEntries: T[]) {
        this.#entries = [];
        this.size = 0;

        if (baseEntries) {
            baseEntries.forEach(entry => {
                if (!this.#entries.includes(entry)) {
                    this.#entries.push(entry);
                }
            });
        }
    }

    entries() {
        return this.#entries.map(x => [x, x]);
    }

    has(value: T) {
        return this.#entries.indexOf(value) != -1;
    }

    add(value: T) {
        if (!this.has(value)) {
            this.size++;
            this.#entries.push(value);
        }
    }

    delete(value: T) {
        if (this.has(value)) this.size--;
        this.#entries = this.#entries.filter(x => x != value);
    }

    clear() {
        this.#entries = [];
    }

    forEach(callback: (value: T, index: number, array: T[]) => void) {
        this.#entries.forEach(callback);
    }
}

export { _Set }