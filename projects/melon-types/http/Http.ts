import { HttpApplication } from "./HttpApplication"
import { HttpComposedResponse } from "./HttpComposedResponse"
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
    }) => HttpApplication,
    result: (statusCode: number, response: any) => HttpComposedResponse,
    static: (response: any, type: `${string}/${string}`) => HttpComposedResponse
}

export { Http }