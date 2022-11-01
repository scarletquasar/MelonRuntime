import { _nextTick } from "../std/async/_nextTick";

async function _createDirectoryAsync(path: string) {
    await _nextTick();
    _$internalBinding["CreateDirectory"](path);
}

export { _createDirectoryAsync }