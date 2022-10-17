import { _nextTick } from "../std/async/_nextTick";

async function _deleteDirectoryAsync(path: string) {
    await _nextTick();
    _$internalBinding["DeleteDirectory"](path, true);
}

export { _deleteDirectoryAsync }