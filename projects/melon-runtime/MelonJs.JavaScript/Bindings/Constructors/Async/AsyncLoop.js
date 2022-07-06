class AsyncLoop {
    constructor(action, times = 1, delay = 0, errorAction = console.error) {
        this._stopped = false;

        this.stop = () => this._stopped = true;

        this.times = times;

        this._promise = new Promise(
            resolve => {
                let result = [];

                while (this.times > 0) {
                    setTimeout(() => result.push(action()), delay);
                    this.times--;
                }

                resolve(result);
            }, errorAction)

        this.execute = () => Promise.resolve(this._promise);
    }
}