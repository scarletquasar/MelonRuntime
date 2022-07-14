const http = {
    _apps: [],
    HttpRoute: class {
        constructor(route, method, callback) {
            this.route = route
            this.method = method
            this.callback = callback
        }
    },
    HttpApplication: class {
        constructor(host, port, enableHttps = true) {
            this.host = host;
            this.port = port;
            this.enableHttps = enableHttps;
            this.echoes = [];
            this.routes = [];
        }

        get(route, callback) {
            const httpRoute = new http.HttpRoute(route, "GET", callback);
            this.routes.push(httpRoute);
        }

        post(route, callback) {
            const httpRoute = new http.HttpRoute(route, "POST", callback);
            this.routes.push(httpRoute);
        }

        delete(route, callback) {
            const httpRoute = new http.HttpRoute(route, "DELETE", callback);
            this.routes.push(httpRoute);
        }

        run() {
            _$internalBinding["SetupWebApplication"](
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
    Response: class {
        constructor(body, headers, latency, statusCode, ok) {
            this.body = body;
            this.headers = headers;
            this.latency = latency;
            this.statusCode = statusCode;
            this.ok = ok;
        }

        json() {
            return JSON.parse(this.body);
        }

        text() {
            return this.body;
        }
    },
    app: (options = { host: "localhost", port: 80, enableHttps: false }) => {
        const { HttpApplication } = http;
        const host = options.host;
        const port = options.port;
        const enableHttps = options.enableHttps ?? false;

        http._apps.push(new HttpApplication(host, port, enableHttps));
        return http._apps[http._apps.length - 1];
    },
    request: function (target, method = "GET", body = "{}", headers = "{}") {
        return new AsyncTask((target, method, body, headers) => {
            typeof headers === "object" ? headers = JSON.stringify(headers) : {};
            typeof body === "object" ? body = JSON.stringify(body) : {};

            const rawResult = _$internalBinding["FetchRequest"](target, method, body, headers);

            return new http.Response(
                rawResult.Body ?? "",
                rawResult.Headers ?? {},
                rawResult.Latency ?? 0,
                rawResult.StatusCode ?? 599,
                rawResult.Ok ?? false
            )
        }, [target, method, body, headers], 0).execute();
    },
    result: (statusCode, response = {}) => {
        return {
            type: "application/json",
            status: statusCode,
            response: JSON.stringify(response)
        }
    },
    static: (response, type) => {
        return {
            type,
            status: 200,
            response
        }
    },
    image: (response, extension) => {
        extension = extension === "jpg" ? "jpeg" : extension;
        return http.static(response, `image/${extension}`);
    },
    audio: (response, extension) => http.static(response, `audio/${extension}`),
    video: (response, extension) => http.static(response, `video/${extension}`),
    pdf: (response) => http.static(response, 'application/pdf'),
    html: (response) => http.static(response, 'text/html')
}