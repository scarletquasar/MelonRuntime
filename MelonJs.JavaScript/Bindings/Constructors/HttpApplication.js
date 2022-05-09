class HttpApplication {
    constructor(host, port, enableHttps = true) {
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
        this.routes = []; //HttpRoute Array
    }

    get(route, callback) {
        const httpRoute = new HttpRoute(route, "GET", callback);
        this.routes.push(httpRoute);
    }

    run() {
        melon_internal_http_application_run(
            this.host,
            this.port,
            JSON.stringify(this.routes),
            this.enableHttps
        );
    }

    listen(port, callback) {
        melon_internal_http_application_run(
            this.host,
            port,
            JSON.stringify(this.routes),
            this.enableHttps
        );

        callback();
    }
}