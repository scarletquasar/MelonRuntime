import { _std } from "../std/_std";
import { _Response } from "./constructors/_Response";
import { _http } from "./_http";

async function _fetch(
    target: string,
    options: Record<string, any>
): Promise<_Response> {
    const task = await _$internalBinding["Fetch"](target, options);

    while(task.Status <= 4) {
        await _std.async.nextTick(1);
    }

    const rawResult = task.Result;

    return new _Response(
        rawResult.Body ?? "",
        rawResult.Headers ?? {},
        rawResult.Latency ?? 0,
        rawResult.StatusCode ?? 599,
        rawResult.Ok ?? false
    )
}

export { _fetch }