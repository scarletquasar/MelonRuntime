const http = {
    request: (target, method = "GET", body = "{}", headers = "{}") => {
        typeof headers === "object" ? headers = JSON.stringify(headers) : {};
        typeof body === "object" ? body = JSON.stringify(body) : {};

        const rawResult = __fetch_request__(target, method, body, headers);

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
        const rawResult = __ping_request__(target, times);

        //Calling "PingResponse.js" binding constructor
        return new PingResponse(
            rawResult.Results ?? [],
            rawResult.MaxLatency ?? 0,
            rawResult.MinLatency ?? 0,
            rawResult.AverageLatency ?? 0
        );
    },

    //Calling "HttpApplication.js" binding constructor to make an alias
    app: (host = "localhost", port = "3000", enableHttps = true) => new HttpApplication(host, port, enableHttps),

    result: (statusCode, response = {}) => {
        return {
            status: statusCode,
            response: JSON.stringify(response)
        }
    }
}