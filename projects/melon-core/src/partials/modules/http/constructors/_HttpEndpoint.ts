class _HttpEndpoint {
    route: string;
    method: string;
    callback: Function;

    constructor(route: string, method: string, callback: Function) {
        this.route = route
        this.method = method
        this.callback = callback
    }
}

export { _HttpEndpoint }