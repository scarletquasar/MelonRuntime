const http = {
    _apps: {},
    request: (target, method = "GET", body = "{}", headers = "{}") => {
        typeof headers === "object" ? headers = JSON.stringify(headers) : {}
        typeof body === "object" ? body = JSON.stringify(body) : {}

        const rawResult = __fetch_request__(target, method, body, headers)

        //Calling "MResponse.js" binding constructor
        return new MResponse(
            rawResult.Body ?? "",
            rawResult.Headers ?? {},
            rawResult.Latency ?? 0,
            rawResult.StatusCode ?? 599,
            rawResult.Ok ?? false
        )
    },
    ping: (target, times = 1) => {
        const rawResult = __ping_request__(target, times)

        //Calling "PingResponse.js" binding constructor
        return new PingResponse(
            rawResult.Results ?? [],
            rawResult.MaxLatency ?? 0,
            rawResult.MinLatency ?? 0,
            rawResult.AverageLatency ?? 0
        )
    },
    //Calling "HttpApplication.js" binding constructor to make an alias
    app: (options) => {
        const name = options.name
        const host = options.host
        const port = options.port
        const enableHttps = options.enableHttps ?? false

        http._apps[name] = new HttpApplication(name, host, port, enableHttps)
        return http._apps[name]
    },
    result: (statusCode, response = {}) => {
        return {
            type: "application/json",
            status: statusCode,
            response: JSON.stringify(response)
        }
    },
    static: (response, type) => {
        return {
            type,
            status: 200,
            response
        }
    },
    image: (response, extension) => {
        extension = extension === "jpg" ? "jpeg" : extension
        return http.static(response, `image/${extension}`)
    },
    audio: (response, extension) => http.static(response, `audio/${extension}`),
    video: (response, extension) => http.static(response, `video/${extension}`),
    pdf: (response) => http.static(response, 'application/pdf'),
}