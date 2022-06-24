declare interface HttpApplication {
    get: (route: string, callback: Function) => void,
    post: (route: string, callback: Function) => void,
    delete: (route: string, callback: Function) => void,
    run: () => void,
    listen: (port: string, host?: string) => void
}

declare const HttpApplication: (host: string, port: string, enableHttps: boolean) => void