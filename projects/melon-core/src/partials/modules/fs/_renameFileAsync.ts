import { _nextTick } from "../std/async/_nextTick";

async function _renameFileAsync(path: string, newName: string) {
    await _nextTick();
    _$internalBinding["RenameFile"](path, newName);
}

export { _renameFileAsync }