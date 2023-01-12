declare type RequestActivatorFunction<T extends Promise<HttpResponse> | HttpResponse> = (
    target: string, 
    method?: HttpMethod, 
    body?: Record<string, any>, 
    headers?: Record<string, any>
) => T

declare const Http: {
    request: RequestActivatorFunction<HttpResponse>;
    requestAsync: RequestActivatorFunction<Promise<HttpResponse>>;
    fetch: (
        target: string, 
        options?: Record<string, any>
    ) => Promise<HttpResponse>;
    app: (options?: {
        name: string, 
        host: string, 
        port: number, 
        enableHttps: boolean 
    }) => HttpApplication;
    result: (
        statusCode: number, 
        response?: any, 
        headers?: Record<string, any>
    ) => HttpComposedResponse;
    static: (
        response: any, 
        type: `${string}/${string}`, 
        headers?: Record<string, any>
    ) => HttpComposedResponse;
}

export { Http }