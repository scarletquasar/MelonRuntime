declare class MResponseConstructorInternal {
    constructor(body: string, headers: Record<string, unknown>, latency: number, statusCode: number, ok: boolean);
    body: string;
    headers: Record<string, string>;
    latency: number;
    statusCode: number;
    ok: boolean;
}