Melon.IndexedArray = class {
    constructor(arg = []) {
        this.length = 0;
        this.indexes = {};

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

        if (Array.isArray(arg)) {
            arg.forEach(x => this.push(x));
        }
        else if (Boolean(Number(arg))) {
            let index = Number(arg);
            while (index > 0) {
                this.push(empty);
                index--;
            }
        }

        this.writeIndex = (name, filter, asIndexed = true) => {
            const arr = this.asArray().filter(filter);
            this.indexes[name] = asIndexed ? new IndexedArray(arr) : arr;
        }
    }
}