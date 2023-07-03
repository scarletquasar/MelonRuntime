type HttpComposedResponse = {
    status: number,
    response: string,
    headers: string
}

type HttpRequest = {
    query: Record<string, any>,
    body: any,
    headers: Record<string, any>,
    method: string,
    url: string
}

type CorsOptions = {
    origin?: string,
    methods?: string[],
    headers?: string[]
}

type CallbackFunction = (request: HttpRequest) => string | HttpComposedResponse;
type AsyncCallbackFunction = (request: HttpRequest) => Promise<string> | Promise<HttpComposedResponse>;

export {
    HttpComposedResponse,
    HttpRequest,
    CallbackFunction,
    AsyncCallbackFunction,
    CorsOptions
}