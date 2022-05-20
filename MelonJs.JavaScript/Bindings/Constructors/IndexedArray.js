class IndexedArray extends Array {
    constructor(array) {
        super()

        if (Array.isArray(array)) {
            array.forEach(x => this.push(x));
        }
    }

    asArray = () => Array.from(this);
    createIndex = (name, position) => this[name] = () => this[position];
}