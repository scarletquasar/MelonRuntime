Melon.HttpApplication = class {
    constructor(name, host, port, enableHttps = true) {
        this.name = name
        this.host = host
        this.port = port
        this.enableHttps = enableHttps
        this.echoes = [] //Additional urls to be listen
        this.routes = [] //HttpRoute Array
    }

    get(route, callback) {
        const httpRoute = new Melon.HttpRoute(route, "GET", callback)
        this.routes.push(httpRoute)
    }

    post(route, callback) {
        const httpRoute = new Melon.HttpRoute(route, "POST", callback)
        this.routes.push(httpRoute)
    }

    delete(route, callback) {
        const httpRoute = new Melon.HttpRoute(route, "DELETE", callback)
        this.routes.push(httpRoute)
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
}