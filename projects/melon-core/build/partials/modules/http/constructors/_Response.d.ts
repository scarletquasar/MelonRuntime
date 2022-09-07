declare class _Response {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;
    constructor(body: string, headers: Record<string, any>, latency: number, statusCode: number, ok: boolean);
    json(): unknown;
    text(): string;
}
export { _Response };
