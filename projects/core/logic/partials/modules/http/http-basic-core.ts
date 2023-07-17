//Type imports
import { 
    CallbackFunction, 
    AsyncCallbackFunction, 
    HttpEndpoint,
    HttpResponse,
    CorsOptions
} from "types/internal/http-types";

//Logic imports
import { getStaticMethod } from "logic/partials/modules/dotnet/dotnet-interop-core";
import { _tryStringify } from "logic/partials/modules/std/json/_tryStringify";
import { _tryParse } from "logic/partials/modules/std/json/_tryParse";
import { _nextTick } from "logic/partials/modules/std/async/_nextTick";
import { Melon } from "logic/index";
import { http } from "logic/partials/modules/http/http";

function $static(response: any, type: `${string}/${string}`, headers: Record<string, any> = {}) {
    const serialize = getStaticMethod("Newtonsoft.Json:JsonConvert:SerializeObject");
    return {
        status: 200,
        response,
        headers: serialize({
            "Content-Type": type,
            ...headers
        })
    }
}

// TODO: This is not real async, just a wrapper and needs review
async function requestAsync(
    target: string,
    method: string = "GET",
    body: Record<string, any> = {},
    headers: Record<string, any> = {}
): Promise<HttpResponse> {
    const result = request(target, method, body, headers);

    return result;
}

function request(
    target: string,
    method: string = "GET",
    body: Record<string, any> = {},
    headers: Record<string, any> = {}
): HttpResponse {
    const stringified = {
        body: _tryStringify(body),
        headers: _tryStringify(headers)
    }

    const rawResult = _$internalBinding["HttpRequest"](
        target,
        method, 
        stringified.body, 
        stringified.headers
    );

    return new Response(
        rawResult.Body ?? "",
        rawResult.Headers ?? {},
        rawResult.Latency ?? 0,
        rawResult.StatusCode ?? 599,
        rawResult.Ok ?? false
    );
}

//TODO: This method is implementing some potentially dangerous blocker actions and needs review
async function fetch(
    target: string,
    options: Record<string, any>
): Promise<HttpResponse> {
    const task = _$internalBinding["Fetch"](target, options);
    const now = new Date().getTime();

    while(task.status <= 4) {
        await _nextTick(1);
    }

    const then = new Date().getTime();
    const rawResult = task.result;

    return new Response(
        rawResult.body ?? "",
        rawResult.headers ?? {},
        now - then,
        rawResult.statusCode ?? 599,
        rawResult.ok ?? false
    );
}

function app(options = { 
    name: "webapp", 
    host: "localhost", 
    port: 80, 
    enableHttps: false 
}): HttpApplication {
    const name = options.name;
    const host = options.host;
    const port = options.port;
    const enableHttps = options.enableHttps ?? false;

    Melon.http._apps[name] = new HttpApplication(name, host, port, enableHttps);
    return http._apps[name];
}

function result<T>(statusCode: number, response: any = {}, headers: Record<string, any> = {}) {
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

    private serialize = getStaticMethod<string>("Newtonsoft.Json:JsonConvert:SerializeObject");

    constructor(status: number, response: T, headers: Record<string, any>) {
        this.status = status;
        this.response = this.serialize(response);
        this.headers = this.serialize(headers);
    }

    useCors(options: CorsOptions) {
        const headers = JSON.parse(this.headers);

        headers["Access-Control-Allow-Headers"] = options.headers ? options.headers.toString() : "*";
        headers["Access-Control-Request-Methods"] = options.methods ? options.methods.toString() : "*";
        headers["Access-Control-Allow-Origin"] = options.origin ? options.origin : "*";

        this.headers = this.serialize(headers);
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
        return _tryParse(this.body) as T;
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

export { request, requestAsync, fetch, app, $static, result }