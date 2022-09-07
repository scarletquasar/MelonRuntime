import { _std } from "../std/_std";
import { _Response } from "./constructors/_Response";
import { _http } from "./_http";

async function _request(
    target: string,
    method: string = "GET",
    body: Record<string, any>,
    headers: Record<string, any>
) {
    const stringified = {
        body: _std.json.tryStringify(body),
        headers: _std.json.tryStringify(headers)
    }

    const rawResult = _$internalBinding["FetchRequest"](
        target,
        method, 
        stringified.body, 
        stringified.headers
    );

    return new _Response(
        rawResult.Body ?? "",
        rawResult.Headers ?? {},
        rawResult.Latency ?? 0,
        rawResult.StatusCode ?? 599,
        rawResult.Ok ?? false
    )
}

export { _request }