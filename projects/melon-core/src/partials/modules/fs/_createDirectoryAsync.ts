import { _std } from "../std/_std";

async function _createDirectoryAsync(path: string) {
    await _std.async.nextTick();
    _$internalBinding["CreateDirectory"](path);
}

export { _createDirectoryAsync }