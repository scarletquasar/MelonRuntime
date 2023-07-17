interface HttpApplicationOptions {
    name?: string, 
    host?: string, 
    port?: number, 
    enableHttps?: boolean
}

interface HttpEndpoint {
    route: string;
    method: string;
    callback: Function;
}

interface HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;

    getEndpoints(): HttpEndpoint[];
    get(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    post(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    delete(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    put(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    patch(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    head(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    options(route: string, callback: CallbackFunction | AsyncCallbackFunction): void;
    listen(port: number, host?: string): void;
    run(): void;
}

interface HttpResponse {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;

    json<T>(): T;
    text(): string;
}

interface HttpResult<T> {
    status: number;
    response: string;
    headers: string;

    useCors(options: CorsOptions): void;
}

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
    HttpResponse,
    HttpRequest,
    CallbackFunction,
    AsyncCallbackFunction,
    CorsOptions,
    HttpResult,
    HttpEndpoint,
    HttpApplication,
    HttpApplicationOptions
}