class HttpRoute {
    constructor(route, method, callback) {
        this.route = route;
        this.method = method;
        this.callback = callback;
    }

    execute(args) {
        return this.callback(args);
    }
}