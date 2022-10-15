interface FetchResponse {
    body: string;
    headers: Record<string, any>;
    status: number;
    statusText: string;
    ok: boolean;
    bodyUsed: boolean;
    json<T>(): T;
    text(): string;
    blob(): number[];
    arrayBuffer(): number[];
    clone(): FetchResponse;
}

export { FetchResponse }