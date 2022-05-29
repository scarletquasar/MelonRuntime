class Response {
    constructor(body, headers, latency, statusCode, ok) {
        this.body = body;
        this.headers = headers;
        this.latency = latency;
        this.statusCode = statusCode;
        this.ok = ok;
    }

    json() {
        return JSON.parse(this.body);
    }

    text() {
        return this.body;
    }
}