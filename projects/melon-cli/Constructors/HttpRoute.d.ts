declare type HttpRoute = (route: string, method: string, callback: string) => {
    route: string,
    method: string,
    callback: string
}