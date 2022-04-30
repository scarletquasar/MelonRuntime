const http = {
    request: (target, method = "GET", body = "{}", headers = "{}") => {
        typeof headers === "object" ? headers = JSON.stringify(headers) : {};
        typeof body === "object" ? body = JSON.stringify(body) : {};

        const rawResult = melon_internal_fetch_request(target, method, body, headers);

        //Calling "Response.js" binding constructor
        return new Response(
            rawResult.Body,
            rawResult.Headers,
            rawResult.Latency,
            rawResult.StatusCode,
            rawResult.Ok
        );
    },

    ping: (target, times) => {
        const rawResult = melon_internal_ping_request(target, times);

        //Calling "PingResponse.js" binding constructor
        return new PingResponse(
            rawResult.Results,
            rawResult.MaxLatency,
            rawResult.MinLatency,
            rawResult.AverageLatency
        );
    }
}