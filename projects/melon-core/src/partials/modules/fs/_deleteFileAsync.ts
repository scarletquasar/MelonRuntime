import { _std } from "../std/_std";

async function _deleteFileAsync(path: string) {
    await _std.async.nextTick();
    _$internalBinding["DeleteFile"](path);
}

export { _deleteFileAsync }