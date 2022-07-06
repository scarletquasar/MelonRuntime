Melon.AsyncTask = class {
    constructor(action, args = [], delay = 0, errorAction = console.error) {
        this._promise = new MPromise(
            resolve => {
                if (delay > 0)
                    setTimeout(() => resolve(action(...args)), delay)

                resolve(action(...args));
            }, errorAction)

        this.execute = () => MPromise.resolve(this._promise);
    }
}