class IndexedArray {
    constructor(array = []) {
        this.length = 0;
        this.dictionary = {};

        this.push = (value, index = 0) => {
            if (!this[index] && typeof this[index] !== "boolean") {
                this[index] = value;
                this.length++;
                return;
            }

            index++;
            this.push(value, index)
        }

        this.asArray = () => {
            let index = 0;
            const result = [];

            while (index < this.length) {
                if (this[index] || typeof this[index] === "boolean") {
                    result.push(this[index]);
                }

                index++;
            }

            return result;
        }

        if (Array.isArray(array)) {
            array.forEach(x => this.push(x));
        }

        this.writeIndex = (name, filter) => {
            this.dictionary[name] = this.asArray().filter(filter);
        }
    }
}