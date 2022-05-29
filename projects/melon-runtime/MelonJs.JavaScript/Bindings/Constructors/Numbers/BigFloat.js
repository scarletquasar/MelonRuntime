class BigFloat {
    constructor(number) {
        this._level = 0;

        while (!Number.isInteger(number) && this._level < 20) {
            number = number * 10;
            this._level++;
        }

        this.value = number;
    }

    getAsFloat() {
        let index = this._level;
        let result = this.value;

        while (index > 0) {
            result = result / 10;
            index--;
        }

        return result;
    }

    addRaw(number) {
        this.value += number;
    }

    add(number) {
        const numberAsBigFloat = new BigFloat(number);
        this.addRaw(numberAsBigFloat.value);
    }
}