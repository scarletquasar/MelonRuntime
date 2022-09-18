declare interface Response {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;
    json<T>(): T;
    text(): string;
}