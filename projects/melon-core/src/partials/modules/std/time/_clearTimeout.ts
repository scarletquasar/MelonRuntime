import { _std } from "../_std";

function _clearTimeout(identifier: string) {
    _std.time._timers[identifier].active = false;
}

export { _clearTimeout }