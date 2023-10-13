//Type imports
import { 
    CallbackFunction, 
    AsyncCallbackFunction, 
    HttpEndpoint,
    HttpResponse,
    CorsOptions
} from "types/internal/http-types";

//Logic imports
import { getStaticMethod } from "../interop/interop-core";
import { deserialize, serialize } from "../stdlib/json-core";
import { interopCache } from "logic/runtime/interop-cache-core";
import { Result } from "../stdlib/functional-core";
import { newUuid } from "../stdlib/encryption-core";

function customResponse(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {;
    return {
        status: 200,
        response,
        headers: serialize({
            "Content-Type": type,
            ...headers
        }).unwrap(true)
    }
}

async function requestAsync(
    target: string,
    method: string = "GET",
    body: Record<string, any> = {},
    headers: Record<string, any> = {}
): Promise<Result<Error, HttpResponse>> {
    const serializedBodyResult = serialize(body);
    const serializedHeadersResult = serialize(headers);

    if(serializedBodyResult.isSuccess() && serializedHeadersResult.isSuccess()) {
        const body = serializedBodyResult.unwrap(true);
        const headers = serializedHeadersResult.unwrap(true);

        const rawResult = await Promise.resolve(interopCache.web.request(
            target,
            method, 
            body, 
            headers
        ));

        return Result.right(new Response(
            rawResult.Body ?? "",
            rawResult.Headers ?? {},
            rawResult.Latency ?? 0,
            rawResult.StatusCode ?? 599,
            rawResult.Ok ?? false
        ));
    }

    return Result.right(new Response(
        "Invalid body or header values",
        {},
        0,
        400,
        false
    ));
}

function createHost(options = { 
    host: "0.0.0.0", 
    port: 80, 
    enableHttps: false 
}): Result<Error, HttpApplication> {
    const name = newUuid().unwrap(true);
    const host = options.host ?? "0.0.0.0";
    const port = options.port ?? 80;
    const enableHttps = options.enableHttps ?? false;

    globalThis.internal.webapps[name] = new HttpApplication(name, host, port, enableHttps);
    return Result.right(globalThis.internal.webapps[name]);
}

function objectResponse<T>(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
    const headersObject = {
        "Content-Type": "application/json",
        ...headers
    };

    const resultObject = new HttpResult<T>(statusCode, response, headersObject);

    return resultObject;
}

class HttpResult<T> {
    public status: number;
    public response: string;
    public headers: string;

    constructor(status: number, response: T, headers: Record<string, any>) {
        this.status = status;
        this.response = serialize(response).unwrap(true);
        this.headers = serialize(headers).unwrap(true);
    }

    useCors(options: CorsOptions) {
        const headers = JSON.parse(this.headers);

        headers["Access-Control-Allow-Headers"] = options.headers ? options.headers.toString() : "*";
        headers["Access-Control-Request-Methods"] = options.methods ? options.methods.toString() : "*";
        headers["Access-Control-Allow-Origin"] = options.origin ? options.origin : "*";

        this.headers = serialize(headers).unwrap(true);
    }
}

class HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    #endpoints: HttpEndpoint[];
    #echoes: any[];

    constructor(
        name: string, 
        host: string, 
        port: number, 
        enableHttps = true
    ) {
        this.name = name;
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
        this.#echoes = [];
        this.#endpoints = [];
    }

    getEndpoints() {
        return this.#endpoints;
    }

    get(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "GET", callback);
        this.#endpoints.push(httpRoute);
    }

    post(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "POST", callback);
        this.#endpoints.push(httpRoute);
    }

    delete(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "DELETE", callback);
        this.#endpoints.push(httpRoute);
    }

    put(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "PUT", callback);
        this.#endpoints.push(httpRoute);
    }

    patch(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "PATCH", callback);
        this.#endpoints.push(httpRoute);
    }

    head(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "HEAD", callback);
        this.#endpoints.push(httpRoute);
    }

    options(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new Endpoint(route, "OPTIONS", callback);
        this.#endpoints.push(httpRoute);
    }

    listen(port: number, host = this.host) {
        this.#echoes.push({
            host,
            port
        });
    }

    run() {
        const parameters = JSON.stringify({
            Name: this.name,
            Host: this.host,
            Port: this.port,
            Routes: JSON.stringify(this.#endpoints),
            Echoes: JSON.stringify(this.#echoes),
            EnableHttps: this.enableHttps
        });

        _$internalBinding["SetupWebApplication"](parameters);
    }
}

class Response implements HttpResponse {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;

    constructor(
        body: string, 
        headers: Record<string, any>, 
        latency: number, 
        statusCode: number, 
        ok: boolean
    ) {
        this.body = body;
        this.headers = headers;
        this.latency = latency;
        this.statusCode = statusCode;
        this.ok = ok;
    }

    json<T>() {
        return deserialize(this.body) as Result<Error, T>;
    }

    text() {
        return this.body;
    }
}

class Endpoint implements HttpEndpoint {
    route: string;
    method: string;
    callback: Function;

    constructor(route: string, method: string, callback: Function) {
        this.route = route
        this.method = method
        this.callback = callback
    }
}

export { requestAsync, createHost, customResponse, objectResponse }
const server = {
    requestAsync,
    createHost,
    objectResponse,
    customResponse
}
export { server }
