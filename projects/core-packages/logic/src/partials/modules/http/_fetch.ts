import { _nextTick } from "../std/async/_nextTick";
import { _Response } from "./constructors/_Response";

async function _fetch(
    target: string,
    options: Record<string, any>
): Promise<_Response> {
    const task = _$internalBinding["Fetch"](target, options);
    const now = new Date().getTime();

    while(task.status <= 4) {
        await _nextTick(1);
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