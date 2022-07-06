Melon.NumberPeriod = class {
    constructor(unitLimit = 100) {
        this._limit = Number(unitLimit);
    }

    getValue(value = 0) {
        return Number(value) / Number(this._limit);
    }

    setLimit(unitLimit) {
        this._limit = Number(unitLimit);
    }
}