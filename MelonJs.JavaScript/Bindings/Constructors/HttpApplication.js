class HttpApplication {
    constructor(host, port, enableHttps = true) {
        this.host = host;
        this.port = port;
        this.enableHttps = enableHttps;
    }

    routes = []; //HttpRoute Array

    get(httpRoute) {
        httpRoute.method = "GET";
        routes.push(routes);
    }

    post(httpRoute) {
        httpRoute.method = "POST";
        routes.push(routes);
    }

    delete(httpRoute) {
        httpRoute.method = "DELETE";
        routes.push(routes);
    }

    run() {
        melon_internal_http_application_run(
            melon_internal_engine,
            this.host,
            this.port,
            this.routes,
            this.enableHttps
        );
    }
}