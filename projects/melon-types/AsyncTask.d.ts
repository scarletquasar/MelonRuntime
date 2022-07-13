declare class AsyncTask<T> {
    constructor(action: Function, args: any[], delay?: number, errorAction?: Function);
    execute: () => Promise<T>;
}