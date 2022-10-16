import { _std } from "../std/_std";

async function _deleteDirectoryAsync(path: string) {
    await _std.async.nextTick();
    _$internalBinding["DeleteDirectory"](path, true);
}

export { _deleteDirectoryAsync }