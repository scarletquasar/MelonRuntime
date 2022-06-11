declare type HttpApplication = (host?: string, port?: string, enableHttps?: boolean) => {
    get: (route: string, callback: string) => void,
    post: (route: string, callback: string) => void,
    delete: (route: string, callback: string) => void,
    run: () => void,
    listen: (port: string, host?: string) => void
}