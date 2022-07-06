Melon.Enumerable = function(base = [], capacity = -1) {
    this.count = 0;
    this._errorCapacity = "Error: Exceeded limit capacity for this Enumerable";

    this.add = (value, index = 0) => {
        if(capacity != -1 && this.count + 1 > capacity) {
            throw new Error(this._errorCapacity);
        }

        if (!this[index] && typeof this[index] !== "boolean") {
            this[index] = value;
            this.count++;
            return;
        }

        index++;
        this.add(value, index)
    }

    if (Array.isArray(base)) {
        base.forEach(x => this.add(x));
    }
    else if (Boolean(Number(base))) {
        let index = Number(base);
        while (index > 0) {
            this.add(empty);
            index--;
        }
    }

    this.toArray = () => {
        let index = 0;
        const result = [];

        while (index < this.count) {
            if (this[index] || typeof this[index] === "boolean") {
                result.push(this[index]);
            }

            index++;
        }

        return result;
    }

    this.take = (quantity) => new Melon.Enumerable(this.toArray().slice(0, quantity));
    this.skip = (quantity) => new Melon.Enumerable(this.toArray().slice(quantity, 0));
    this.where = (filter) => new Melon.Enumerable(this.toArray()).filter(filter);
    this.cast = (constructor) => new Melon.Enumerable(this.toArray().map(x => new constructor(x)));
    this.firstOrDefault = () => this[0] ?? null;
    this.lastOrDefault = () => this[this.count - 1] ?? null;
    this.first = () => this[0];
    this.last = () => this[this.count - 1];
    this.any = () => this.toArray().length > 0;
    this.all = (condition = x => x === x) => this.toArray().map(x => condition(x)).every(true);
    this.average = () => this.toArray().reduce((partialSum, a) => partialSum + a) / this.toArray().length;
    this.equals = (element) => data.compare(this.toArray(), element);
    this.addRange = (elements) => elements.forEach(this.add);
    this.clear = () => {
        let index = this.count;
        while(index > 0) {
            this[index - 1] = undefined;
            index--;
        }
    }

    return this;
}