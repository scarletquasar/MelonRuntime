declare class HttpRouteConstructorInternal {
    constructor(body: string, headers: Record<string, unknown>, latency: number, statusCode: number, ok: boolean);
    route: string;
    method: string;
    callback: string;
}