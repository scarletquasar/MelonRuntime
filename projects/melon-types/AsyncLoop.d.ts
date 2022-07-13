declare class AsyncLoop<T> {
    constructor(action: Function, times?: number, delay?: number, errorAction?: Function);
    stop: () => void;
    times: number;
    execute: () => Promise<T>;
}