function Enumerable(base = []) {
    this.count = 0;
    /* Define add */
    this.add = (value, index = 0) => {
        if (!this[index] && typeof this[index] !== "boolean") {
            this[index] = value;
            this.count++;
            return;
        }

        index++;
        this.add(value, index)
    }

    /* Setup array-based structure */
    if (Array.isArray(base)) {
        arg.forEach(x => this.push(x));
    }
    else if (Boolean(Number(arg))) {
        let index = Number(arg);
        while (index > 0) {
            this.push(empty);
            index--;
        }
    }

    /* Define toArray */
    this.toArray = () => {
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

    /* Setup methods */
    this.take = (quantity) => new Enumerable(this.toArray().slice(0, quantity));
    this.skip = (quantity) => new Enumerable(this.toArray().slice(quantity, 0));
    this.where = (filter) => new Enumerable(this.toArray()).filter(filter);
    this.firstOrDefault = () => this[0] ?? null;
    this.lastOrDefault = () => this[this.count - 1] ?? null;
    this.first = () => this[0];
    this.last = () => this[this.count - 1];
    this.any = () => this.toArray().length > 0;
    this.all = (condition = x => x === x) => this.toArray().map(x => condition(x)).every(true);
    this.average = () => this.toArray().reduce((partialSum, a) => partialSum + a) / this._elements.length;
    this.cast = (constructor) => new Enumerable(this.toArray().map(x => new constructor(x)));
    this.equals = (element) => data.compare(this.toArray(), element);
    this.addRange = (elements) => elements.forEach(this.add);
    this.clear = () => {
        let index = this.count;
        while(index > 0) {
            this[index - 1] = undefined;
            index--;
        }
    }

    /* Return instance */
    return this;
}