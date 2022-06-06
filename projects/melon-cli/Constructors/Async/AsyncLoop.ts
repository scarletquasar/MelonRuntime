declare type AsyncLoop = (action: Function, times?: number, delay?: number, errorAction?: Function) => {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}