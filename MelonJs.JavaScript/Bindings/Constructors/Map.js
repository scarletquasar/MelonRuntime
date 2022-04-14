class Map {
    constructor(baseEntries) {
        this._entries = {};

        if (baseEntries) {
            baseEntries.forEach(entry => {
                this._entries[entry[0]] = entry[1];
            });
        }
    }

    entries() {
        return this._entries;
    }

    has(key) {
        return this._entries[key] != null;
    }

    set(key, value) {
        this._entries[key] = value;
    }

    get(key) {
        return this._entries[key];
    }

    delete(key) {
        this.set(key, null);
    }

    keys() {
        return Object.keys(this._entries);
    }

    values() {
        return Object.values(this._entries);
    }
}