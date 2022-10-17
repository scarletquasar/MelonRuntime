import { _nextTick } from "../std/async/_nextTick";

async function _deleteFileAsync(path: string) {
    await _nextTick();
    _$internalBinding["DeleteFile"](path);
}

export { _deleteFileAsync }