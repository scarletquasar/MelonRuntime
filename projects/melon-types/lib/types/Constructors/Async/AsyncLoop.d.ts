declare interface AsyncLoop {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}

declare const AsyncLoop: (action: Function, times: number, delay: number, errorAction: Function) => void