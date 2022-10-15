import { FetchResponse } from "../../../types/http/FetchResponse";
import { _std } from "../std/_std";
import { _Response } from "./constructors/_Response";
import { _http } from "./_http";

async function _fetch(
    target: string,
    options: Record<string, any>
): Promise<FetchResponse> {
    const rawResult = await _$internalBinding["Fetch"](target, options);

    while(!rawResult.Status) {
        await (async () => {})();
    }

    return rawResult;
}

export { _fetch }