class HttpApplication {
    constructor(host, port, enableHttps = true) {
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
        this.echoes = []; //Additional urls to be listen
        this.routes = []; //HttpRoute Array
    }

    get(route, callback) {
        const httpRoute = new HttpRoute(route, "GET", callback);
        this.routes.push(httpRoute);
    }

    post(route, callback) {
        const httpRoute = new HttpRoute(route, "POST", callback);
        this.routes.push(httpRoute);
    }

    delete(route, callback) {
        const httpRoute = new HttpRoute(route, "DELETE", callback);
        this.routes.push(httpRoute);
    }

    run() {
        melon_internal_http_application_run(
            this.host,
            this.port,
            JSON.stringify(this.routes),
            JSON.stringify(this.echoes),
            this.enableHttps
        );
    }

    listen(port, host = this.host) {
        this.echoes.push({
            host: this.host,
            port: Number(port)
        });
    }
}