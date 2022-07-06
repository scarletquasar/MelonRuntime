Melon.Map = class {
    constructor(baseEntries) {
        this._entries = {};
        this.size = 0;

        if (baseEntries) {
            baseEntries.forEach(entry => {
                this._entries[entry[0]] = entry[1];
            });
        }
    }

    entries() {
        return Object.entries(this._entries);
    }

    has(key) {
        return this._entries[key] != null;
    }

    set(key, value) {
        if (!this.has(key)) this.size++;
        this._entries[key] = value;
    }

    get(key) {
        return this._entries[key];
    }

    delete(key) {
        if (this.has(key)) this.size--;
        this.set(key, null);
    }

    keys() {
        return Object.keys(this._entries);
    }

    values() {
        return Object.values(this._entries);
    }

    /*
     * forEach(() => { ... } )
     * forEach((value) => { ... } )
     * forEach((value, key) => { ... } )
     * forEach((value, key, map) => { ... } )
     */
    forEach(callback) {
        this.entries().forEach(x => callback(x[1], x[0], this));
    }
}