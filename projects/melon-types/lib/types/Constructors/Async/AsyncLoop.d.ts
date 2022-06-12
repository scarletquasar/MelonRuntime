declare interface AsyncLoop {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}