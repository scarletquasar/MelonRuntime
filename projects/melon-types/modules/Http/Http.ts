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
    result: 
        (statusCode: number, response?: any, headers?: Record<string, any>) => HttpComposedResponse;
    static:
        (response: any, type: `${string}/${string}`, headers?: Record<string, any>) => HttpComposedResponse;
}