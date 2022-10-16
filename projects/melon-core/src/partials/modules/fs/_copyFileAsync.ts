import { _std } from "../std/_std";

async function _copyFileAsync(from: string, to: string) {
    await _std.async.nextTick();
    _$internalBinding["CopyFile"](from, to, true);
}

export { _copyFileAsync }