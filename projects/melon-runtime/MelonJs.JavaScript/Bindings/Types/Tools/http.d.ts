type Http = {
    request: (target: string, method: string, body: string, headers: string) => MResponse,
    ping: (target: string, times: number) => PingResponse,
    app: (host: string, port: string, enableHttps: boolean) => HttpApplication,
    result: (statusCode: number, response?: Record<any, any>) => {
        statusCode: number,
        response: string
    }
}

declare const http: Http