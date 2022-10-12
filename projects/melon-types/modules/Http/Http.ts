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
}