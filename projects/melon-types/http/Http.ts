import { Response } from "./Response"

type Http = {
    request: (
        target: string,
        method?: string,
        body?: Record<string, any>,
        headers?: Record<string, any>
    ) => Promise<Response>,
    app: (options: {
        name: string, 
        host: string,
        port: number,
        enableHttps: boolean
    }) => HttpApplication
}

export { Http }