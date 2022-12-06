import { _std } from "../_std";

function _clearTimeout(identifier: string) {
    _std.time._timers[identifier].clear();
}

export { _clearTimeout }