import { _std } from "../std/_std";

async function _renameFileAsync(path: string, newName: string) {
    await _std.async.nextTick();
    _$internalBinding["RenameFile"](path, newName);
}

export { _renameFileAsync }