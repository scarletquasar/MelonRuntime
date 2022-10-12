declare type HttpMethod = 
    "get" | "post" | "patch" | "delete" | "head" | "options" |
    "GET" | "POST" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

declare interface HttpResponse {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;
}

declare interface HttpRequest {
    query: Record<string, any>;
    body: any;
    headers: Record<string, any>;
}

declare interface HttpComposedResponse {
    status: number;
    response: string;
    headers: string;
}

declare interface HttpEndpoint {
    route: string;
    method: string;
    callback: Function;
}

declare type HttpCallbackFunction = 
    (request: HttpRequest) => string | HttpComposedResponse;

declare type HttpAsyncCallbackFunction = 
    (request: HttpRequest) => Promise<string> | Promise<HttpComposedResponse>;

declare interface HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    getEndpoints: () => HttpEndpoint[];
    get: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    post: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    delete: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    patch: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    put: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    options: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    head: (
        route: string, 
        callback: HttpCallbackFunction | HttpAsyncCallbackFunction
    ) => void;
    listen: (port: number, host?: string) => void;
    run: () => void;
}
 
declare interface Http {
    request: (
        target: string, 
        method?: HttpMethod, 
        body?: Record<string, any>, 
        headers?: Record<string, any>
    ) => HttpResponse;
    requestAsync: (
        target: string, 
        method?: HttpMethod, 
        body?: Record<string, any>, 
        headers?: Record<string, any>
    ) => Promise<HttpResponse>;
    app: (options: {
        name: string, 
        host: string, 
        port: number, 
        enableHttps: boolean 
    }) => HttpApplication;
}