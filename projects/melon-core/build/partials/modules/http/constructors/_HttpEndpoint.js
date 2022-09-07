class _HttpEndpoint {
    route;
    method;
    callback;
    constructor(route, method, callback) {
        this.route = route;
        this.method = method;
        this.callback = callback;
    }
}
export { _HttpEndpoint };
