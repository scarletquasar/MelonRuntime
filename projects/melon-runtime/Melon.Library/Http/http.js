const http = {
    _apps: [],
    HttpApplication: class {
        constructor(name, host, port, enableHttps = true) {
            this.name = name;
            this.host = host;
            this.port = port;
            this.enableHttps = enableHttps;
            this.echoes = [];
            this.routes = [];
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
            __http_application_run__(
                this.name,
                this.host,
                this.port,
                JSON.stringify(this.routes),
                JSON.stringify(this.echoes),
                this.enableHttps
            )
        }

        listen(port, host = this.host) {
            this.echoes.push({
                host,
                port: Number(port)
            })
        }
    },
    app: (options = { host: "localhost", post: 80, enableHttps: false }) => {
        const { HttpApplication } = http;
        const name = options.name;
        const host = options.host;
        const port = options.port;
        const enableHttps = options.enableHttps ?? false;

        http._apps.push(new HttpApplication(host, port, enableHttps));
        return http._apps[http._apps.length - 1];
    },
}