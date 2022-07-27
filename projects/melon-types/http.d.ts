type ImageExtension = "png" | "gif" | "jpeg" | "jpg" | "png" | "svg+xml" | "webp" | "bmp" | "avif" | "tiff";
type AudioExtension = "wave" | "wav" | "x-wav" | "x-pn-wav" | "webm" | "ogg" | "opus" | "midi" | "aac";
type VideoExtension = "x-flv" | "mp4" | "x-msvideo" | "mpeg" | "ogg" | "webm" | "mp2t" | "3gpp" | "3ggp2";
type AnyExtension = string;

type MSimpleResponse<R, MT extends string> = {
    type: MT,
    status: number,
    response: R
}

type HttpRequest = {
    query: Record<string, any>,
    body: any,
    headers: Record<string, any>
}

type HttpApplicationEvent = "beforeCall" | "afterCall" | "error";

type HttpComposedResponse = {
    type: string;
    status: number;
    response: string;
}

declare class HttpApplicationInternal {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    echoes: any[];
    routes: any[];
    on: (event: HttpApplicationEvent, action: (request: HttpRequest) => any) => void;
    use: (middleware: (request: HttpRequest) => any) => void;
    get: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    post: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    delete: (route: string, callback: (request: HttpRequest) => string | HttpComposedResponse) => void;
    run: () => void;
    listen: (port: number, host?: string) => void;
}

declare class ResponseInternal {
    constructor(
        body: string, 
        headers: Record<string, any>, 
        latency: number, 
        statusCode: number, 
        ok: boolean
    );
    json: () => Record<string, any>;
    text: () => string;
}

type Http = {
    HttpApplication: HttpApplicationInternal
    Response: ResponseInternal
    request: (target: string, method: string, body: string, headers: string) => Promise<Http["Response"]>
    app: (options?: { name: string, host: string, port: number, enableHttps?: boolean }) => HttpApplicationInternal
    result: (statusCode: number, response?: any) => {
        type: string,
        status: number,
        response: string
    }
    static: <R, MT extends AnyExtension>(response: R, type: MT) => MSimpleResponse<R, `${MT}`>
    image: <R, EX extends ImageExtension>(response: R, extension: EX) => MSimpleResponse<R, `image/${EX}`>
    audio: <R, EX extends AudioExtension>(response: R, extension: EX) => MSimpleResponse<R, `audio/${EX}`>
    video: <R, EX extends ImageExtension>(response: R, extension: EX) => MSimpleResponse<R, `video/${EX}`>
    pdf: <R>(response: R) => MSimpleResponse<R, 'application/pdf'>
    html: <R>(response: R) => MSimpleResponse<R, 'text/html'>
}

declare const http: Http;