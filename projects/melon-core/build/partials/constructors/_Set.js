class _Set {
    #entries;
    size;
    constructor(baseEntries) {
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
    has(value) {
        return this.#entries.indexOf(value) != -1;
    }
    add(value) {
        if (!this.has(value)) {
            this.size++;
            this.#entries.push(value);
        }
    }
    delete(value) {
        if (this.has(value))
            this.size--;
        this.#entries = this.#entries.filter(x => x != value);
    }
    clear() {
        this.#entries = [];
    }
    forEach(callback) {
        this.#entries.forEach(callback);
    }
}
export { _Set };
