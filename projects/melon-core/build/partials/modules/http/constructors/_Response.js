import { _std } from "../../std/_std";
class _Response {
    body;
    headers;
    latency;
    statusCode;
    ok;
    constructor(body, headers, latency, statusCode, ok) {
        this.body = body;
        this.headers = headers;
        this.latency = latency;
        this.statusCode = statusCode;
        this.ok = ok;
    }
    json() {
        return _std.json.tryParse(this.body);
    }
    text() {
        return this.body;
    }
}
export { _Response };
