class Set {
    constructor(baseEntries) {
        this._entries = [];
        this.size = 0;

        if (baseEntries) {
            baseEntries.forEach(entry => {
                this._entries.push(entry);
            });
        }
    }
}