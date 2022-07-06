declare interface MResponse {
    body: string,
    headers: Record<string, string>,
    latency: number,
    statusCode: number,
    ok: boolean
}