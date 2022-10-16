import { _std } from "../std/_std";
import { _Response } from "./constructors/_Response";
import { _http } from "./_http";
import { _request } from "./_request";

async function _requestAsync(
    target: string,
    method: string = "GET",
    body: Record<string, any> = {},
    headers: Record<string, any> = {}
): Promise<_Response> {
    await _std.async.nextTick();
    const result = _request(target, method, body, headers);
    return result;
}

export { _requestAsync }