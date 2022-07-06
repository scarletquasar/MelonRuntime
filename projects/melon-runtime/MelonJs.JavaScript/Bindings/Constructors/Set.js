class Set {
    constructor(baseEntries) {
        this._entries = [];
        this.size = 0;

        if (baseEntries) {
            baseEntries.forEach(entry => {
                if (!this._entries.includes(entry)) {
                    this._entries.push(entry);
                }
            });
        }
    }

    entries() {
        return this._entries.map(x => [x, x]);
    }

    has(value) {
        return this._entries.indexOf(value) != -1;
    }

    add(value) {
        if (!this.has(value)) {
            this.size++;
            this._entries.push(value);
        }
    }

    delete(value) {
        if (this.has(value)) this.size--;
        this.set(value, null);
    }

    clear() {
        this._entries = [];
    }

    forEach(callback) {
        this._entries.forEach(callback);
    }
}