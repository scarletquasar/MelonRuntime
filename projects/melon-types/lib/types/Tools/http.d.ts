/// <reference path="../Constructors/PingResponse.d.ts" />
/// <reference path="../Constructors/MResponse.d.ts" />
/// <reference path="../Constructors/HttpApplication.d.ts" />

type ImageMimeType = "png" | "gif" | "jpeg" | "jpg" | "png" | "svg+xml" | "webp"
type AudioMimeType = "wave" | "wav" | "x-wav" | "x-pn-wav" | "webm" | "ogg"

type HttpResult<R, MT extends number> = {
    type: MT,
    status: number,
    response: R
}

type Http = {
    request: (target: string, method: string, body: string, headers: string) => MResponse,
    ping: (target: string, times: number) => PingResponse,
    app: (options: {name: string, host: string, port: string, enableHttps?: boolean}) => HttpApplication,
    result: (statusCode: number, response?: any) => {
        type: string,
        status: number,
        response: string
    }
    static: <R, MT>(response: R, type: string) => HttpResult<R, MT>
    image: <R, EX extends ImageMimeType>(response: R, extension: EX) => HttpResult<R, `image/${EX}`>
    pdf: <R>(response: R) => HttpResult<R, 'application/pdf'>
}

declare const http: Http