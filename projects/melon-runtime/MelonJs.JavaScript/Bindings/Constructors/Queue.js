class Queue {
    constructor(callbackArray) {
        this._queue = Array.from(callbackArray);
    }

    run(condition) {
        let lastRes = null;
        let index = this._queue.length;

        while (index > 0) {
            lastRes = this._queue[index - 1]();
            lastRes === condition ? {} : index = 0;
            index--;
        }

        return index != -1;
    }
}