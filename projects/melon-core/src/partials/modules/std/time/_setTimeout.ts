import { _crypto } from "../../../statics/_crypto";
import { _std } from "../_std";

const defineTimeoutOf = _$internalBinding["DefineTimeoutOf"];

function _setTimeout(callback: Function, delay: number) {
    const identifier = _crypto.randomUUID();

    _std.time._timers[identifier] = {
        callback,
        active: true
    }

    defineTimeoutOf(identifier, delay);

    return identifier;
}

export { _setTimeout }