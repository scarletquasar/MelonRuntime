declare interface AsyncTask {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}

declare const AsyncTask: (action: Function, args: any[], delay: number, errorAction: Function) => void