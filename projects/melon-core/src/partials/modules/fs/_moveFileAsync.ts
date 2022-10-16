import { _std } from "../std/_std";

async function _moveFileAsync(from: string, to: string) {
    await _std.async.nextTick();
    _$internalBinding["MoveFile"](from, to, true);
}

export { _moveFileAsync }