const http = {
    request: (target, method = "GET", body = "{}", headers = "{}") => {
        typeof headers === "object" ? headers = JSON.stringify(headers) : {};
        typeof body === "object" ? body = JSON.stringify(body) : {};

        const rawResult = melon_internal_fetch_request(target, method, body, headers);

        return new HttpResponse(
            rawResult.body,
            rawResult.headers,
            rawResult.latency,
            rawResult.statusCode,
            rawResult.ok
        );
    }
}