declare class _HttpEndpoint {
    route: string;
    method: string;
    callback: Function;
    constructor(route: string, method: string, callback: Function);
}
export { _HttpEndpoint };
