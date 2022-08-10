import { AnyExtension, AudioExtension, ImageExtension } from "./types/http/FileExtensions";
import { HttpApplicationInternal } from "./types/http/HttpApplicationInternal";
import { HttpResultInternal } from "./types/http/HttpResultInternal";
import { MSimpleResponse } from "./types/http/MSimpleResponse";
import { ResponseInternal } from "./types/http/ResponseInternal";

type Http = {
    HttpApplication: HttpApplicationInternal
    Response: ResponseInternal
    request: (target: string, method?: string, body?: string, headers?: string) => Promise<Http["Response"]>
    app: (options?: { name: string, host: string, port: number, enableHttps?: boolean }) => HttpApplicationInternal
    result: (statusCode: number, response?: any) => HttpResultInternal,
    static: <R, MT extends AnyExtension>(response: R, type: MT) => MSimpleResponse<R, `${MT}`>
    image: <R, EX extends ImageExtension>(response: R, extension: EX) => MSimpleResponse<R, `image/${EX}`>
    audio: <R, EX extends AudioExtension>(response: R, extension: EX) => MSimpleResponse<R, `audio/${EX}`>
    video: <R, EX extends ImageExtension>(response: R, extension: EX) => MSimpleResponse<R, `video/${EX}`>
    pdf: <R>(response: R) => MSimpleResponse<R, 'application/pdf'>
    html: <R>(response: R) => MSimpleResponse<R, 'text/html'>
}

declare const http: Http;