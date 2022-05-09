const http = {
    request: (target, method = "GET", body = "{}", headers = "{}") => {
        typeof headers === "object" ? headers = JSON.stringify(headers) : {};
        typeof body === "object" ? body = JSON.stringify(body) : {};

        const rawResult = melon_internal_fetch_request(target, method, body, headers);

        //Calling "Response.js" binding constructor
        return new Response(
            rawResult.Body ?? "",
            rawResult.Headers ?? {},
            rawResult.Latency ?? 0,
            rawResult.StatusCode ?? 599,
            rawResult.Ok ?? false
        );
    },

    ping: (target, times = 1) => {
        const rawResult = melon_internal_ping_request(target, times);

        //Calling "PingResponse.js" binding constructor
        return new PingResponse(
            rawResult.Results ?? [],
            rawResult.MaxLatency ?? 0,
            rawResult.MinLatency ?? 0,
            rawResult.AverageLatency ?? 0
        );
    },

    app: (host = "localhost", port = "3000", enableHttps = true) => new HttpApplication(host, port, enableHttps)
}