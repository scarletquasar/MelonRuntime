class AsyncLoop {
    constructor(action, times, delay, errorAction = console.error) {
        this._stopped = false;

        this.stop = () => this._stopped = true;

        this.times = times;

        this._promise = new Promise(
            resolve => {
                if (delay > 0)
                    setTimeout(() => resolve(action()), delay)

                resolve(action());
            }, errorAction)

        this.execute = () => {
            Promise.resolve(this._promise)
                .then(() => {
                    if ((this.times > 0 || this.times < 0) && !this._stopped) {
                        this.execute();
                        this.times--;
                    }
                })
                .catch(errorAction)
        }
    }
}