declare class AsyncTaskConstructorInternal {
    constructor(action: Function, args: any[], delay: number, errorAction: Function);
    stop: () => void;
    times: number;
    execute: () => Promise<any>;
}