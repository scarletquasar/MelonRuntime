class _Map {
    #entries;
    size;
    constructor(baseEntries) {
        this.#entries = {};
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
    has(key) {
        return this.#entries[key] != null;
    }
    set(key, value) {
        if (!this.has(key))
            this.size++;
        this.#entries[key] = value;
    }
    get(key) {
        return this.#entries[key];
    }
    delete(key) {
        if (this.has(key))
            this.size--;
        this.set(key, null);
    }
    keys() {
        return Object.keys(this.#entries);
    }
    values() {
        return Object.values(this.#entries);
    }
    forEach(callback) {
        this.entries().forEach(x => callback(x[1], x[0], this));
    }
}
export { _Map };
