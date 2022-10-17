import { _nextTick } from "../std/async/_nextTick";

async function _copyFileAsync(from: string, to: string) {
    await _nextTick();
    _$internalBinding["CopyFile"](from, to, true);
}

export { _copyFileAsync }