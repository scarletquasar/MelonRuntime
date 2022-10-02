import { AsyncCallbackFunction } from "../../../../types/http/AsyncCallbackFunction";
import { CallbackFunction } from "../../../../types/http/CallbackFunction";
import { _http } from "../_http";
import { _HttpEndpoint } from "./_HttpEndpoint";

class _HttpApplication {
    name: string;
    host: string;
    port: number;
    enableHttps: boolean;
    #endpoints: _HttpEndpoint[];
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
        const httpRoute = new _HttpEndpoint(route, "GET", callback);
        this.#endpoints.push(httpRoute);
    }

    post(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new _HttpEndpoint(route, "POST", callback);
        this.#endpoints.push(httpRoute);
    }

    delete(route: string, callback: CallbackFunction | AsyncCallbackFunction) {
        const httpRoute = new _HttpEndpoint(route, "DELETE", callback);
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

export { _HttpApplication }