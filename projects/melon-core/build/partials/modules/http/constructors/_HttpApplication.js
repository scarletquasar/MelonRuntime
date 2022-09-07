import { _HttpEndpoint } from "./_HttpEndpoint";
class _HttpApplication {
    name;
    host;
    port;
    enableHttps;
    #endpoints;
    #echoes;
    constructor(name, host, port, enableHttps = true) {
        this.name = name;
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
        this.#echoes = [];
        this.#endpoints = [];
    }
    get(route, callback) {
        const httpRoute = new _HttpEndpoint(route, "GET", callback);
        this.#endpoints.push(httpRoute);
    }
    post(route, callback) {
        const httpRoute = new _HttpEndpoint(route, "POST", callback);
        this.#endpoints.push(httpRoute);
    }
    delete(route, callback) {
        const httpRoute = new _HttpEndpoint(route, "DELETE", callback);
        this.#endpoints.push(httpRoute);
    }
    listen(port, host = this.host) {
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
export { _HttpApplication };
