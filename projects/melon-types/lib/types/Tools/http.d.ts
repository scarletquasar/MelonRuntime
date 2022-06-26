/// <reference path="../Constructors/PingResponse.d.ts" />
/// <reference path="../Constructors/MResponse.d.ts" />
/// <reference path="../Constructors/HttpApplication.d.ts" />

type Http = {
    request: (target: string, method: string, body: string, headers: string) => MResponse,
    ping: (target: string, times: number) => PingResponse,
    app: (options: {name: string, host: string, port: string, enableHttps?: boolean}) => HttpApplication,
    result: (statusCode: number, response?: any) => {
        type: string,
        status: number,
        response: string
    }
    static: (response?: string) => {
        type: string,
        status: number,
        response: string
    }
}

declare const http: Http