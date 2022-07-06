declare interface HttpRoute {
    route: string,
    method: string,
    callback: string
}

declare const HttpRoute: (route: string, method: string, callback: string) => void