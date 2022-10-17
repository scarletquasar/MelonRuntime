import { _nextTick } from "../std/async/_nextTick";

async function _moveFileAsync(from: string, to: string) {
    await _nextTick();
    _$internalBinding["MoveFile"](from, to, true);
}

export { _moveFileAsync }