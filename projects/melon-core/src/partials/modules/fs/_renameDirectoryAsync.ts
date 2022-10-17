import { _std } from "../std/_std";

async function _renameDirectoryAsync(path: string, newName: string) {
    await _std.async.nextTick();
    _$internalBinding["RenameDirectory"](path, newName);
}

export { _renameDirectoryAsync }