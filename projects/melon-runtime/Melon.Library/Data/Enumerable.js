function Enumerable(base = [], capacity = -1) {
    this.count = 0;
    this._errorCapacity = "Error: Exceeded limit capacity for this Enumerable";
    this.add = (value, index = 0) => {
        if(capacity != -1 && this.count + 1 > capacity) {
            throw new Error(this._errorCapacity);
        }

        if (this[index] === undefined) {
            this[index] = value;
            this.count++;
            return this;
        }

        index++;
        this.add(value, index);

        return this;
    }
    if (Array.isArray(base)) {
        base.forEach(x => this.add(x));
    }
    else if (Boolean(Number(base))) {
        let index = Number(base);
        while (index > 0) {
            this.add("");
            index--;
        }
    }
    this.toArray = () => {
        let index = 0;
        const result = [];

        while (index < this.count) {
            if (this[index] != undefined) {
                result.push(this[index]);
            }

            index++;
        }

        return result;
    }
    this.take = (quantity) => new Enumerable(this.toArray().slice(0, quantity));
    this.skip = (quantity) => new Enumerable(this.toArray().slice(quantity));
    this.where = (filter) => new Enumerable(this.toArray().filter(filter));
    this.firstOrDefault = () => this.toArray()[0] ?? null;
    this.lastOrDefault = () => this.toArray()[this.count - 1] ?? null;
    this.first = () => this[0];
    this.last = () => this[this.count - 1];
    this.any = () => this.toArray().length > 0;
    this.all = (condition = x => x === x) => this.toArray().every(x => condition(x));

    this.average = () => {
        const array = this.toArray();
        const sum = array.reduce((a, b) => a + b, 0);

        return (sum / array.length) || 0;
    }
    this.cast = (constructor) => new Enumerable(this.toArray().map(x => new constructor(x)));
    this.equals = (element) => data.compare(this.toArray(), element);
    this.addRange = (elements) => {
        elements.forEach(this.add);
        return this;
    };
    this.clear = () => {
        let index = this.count;
        while(index > 0) {
            this[index - 1] = undefined;
            index--;
        }
        this.count = 0;
        return this;
    }
    return this;
}