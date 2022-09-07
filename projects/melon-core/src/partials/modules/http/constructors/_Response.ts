import { _std } from "../../std/_std";

class _Response {
    body: string;
    headers: Record<string, any>;
    latency: number;
    statusCode: number;
    ok: boolean;

    constructor(
        body: string, 
        headers: Record<string, any>, 
        latency: number, 
        statusCode: number, 
        ok: boolean
    ) {
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

export { _Response }