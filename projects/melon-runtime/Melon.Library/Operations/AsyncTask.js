class AsyncTask {
    constructor(action, args = [], delay = 0, errorAction = console.error) {
        this._promise = new Promise(
            resolve => {
                if (delay > 0)
                    setTimeout(() => resolve(action(...args)), delay)

                resolve(action(...args));
            }, errorAction)

        this.execute = () => Promise.resolve(this._promise);
    }
}