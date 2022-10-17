import { _std } from "../std/_std";
import { _Response } from "./constructors/_Response";
import { _http } from "./_http";

async function _fetch(
    target: string,
    options: Record<string, any>
): Promise<_Response> {
    const task = _$internalBinding["Fetch"](target, options);
    const now = new Date().getTime();

    while(task.status <= 4) {
        await _std.async.nextTick(1);
    }

    const then = new Date().getTime();
    const rawResult = task.result;

    return new _Response(
        rawResult.body ?? "",
        rawResult.headers ?? {},
        now - then,
        rawResult.statusCode ?? 599,
        rawResult.ok ?? false
    )
}

export { _fetch }