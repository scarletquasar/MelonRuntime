class HttpResponse {
    constructor(response, headers) {
        this.response = response;
        this.headers = headers;
    }

    json() {
        return JSON.parse(this.response);
    }

    text() {
        return this.response;
    }
}