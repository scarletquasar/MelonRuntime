import { HttpApplicationInternal } from "../melon-core/types/http/HttpApplicationInternal";
import { HttpResultInternal } from "../melon-core/types/http/HttpResultInternal";
import { ResponseInternal } from "../melon-core/types/http/ResponseInternal";
import { HttpResponse } from "../melon-core/types/http/HttpResponse";

type Http = {
    request: (target: string, method?: string, body?: Record<string, any>, headers?: Record<string, any>) => Promise<ResponseInternal>
    app: (options?: { name: string, host: string, port: number, enableHttps?: boolean }) => HttpApplicationInternal
    result: (statusCode: number, response?: any) => HttpResultInternal,
    static: (response: any, type: `${string}/${string}`) => HttpResponse
    image: (response: R, extension: EX) => MSimpleResponse<R, `image/${EX}`>
    audio: <R, EX extends AudioExtension>(response: R, extension: EX) => MSimpleResponse<R, `audio/${EX}`>
    video: <R, EX extends ImageExtension>(response: R, extension: EX) => MSimpleResponse<R, `video/${EX}`>
    pdf: <R>(response: R) => MSimpleResponse<R, 'application/pdf'>
    html: <R>(response: R) => MSimpleResponse<R, 'text/html'>
}

declare const http: Http;