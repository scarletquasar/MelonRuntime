declare type AsyncTask = (action: Function, args?: any[], delay?: number, errorAction?: Function) => {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}