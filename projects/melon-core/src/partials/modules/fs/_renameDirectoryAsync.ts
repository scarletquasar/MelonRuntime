import { _nextTick } from "../std/async/_nextTick";

async function _renameDirectoryAsync(path: string, newName: string) {
    await _nextTick();
    _$internalBinding["RenameDirectory"](path, newName);
}

export { _renameDirectoryAsync }