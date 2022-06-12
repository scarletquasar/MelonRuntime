declare interface AsyncTask {
    stop: () => void,
    times: number,
    execute: () => Promise<any>
}