declare type MResponse = {
    body: string,
    headers: Record<string, string>,
    latency: number,
    statusCode: number,
    ok: boolean
}