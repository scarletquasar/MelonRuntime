import { _crypto } from "../../../statics/_crypto";
import { _log } from "../../console/_log";
import { _std } from "../_std";

const defineIntervalOf = _$internalBinding["DefineIntervalOf"];

function _setInterval(callback: Function, delay: number) {
    const identifier = _crypto.randomUUID();

    _std.time._timers[identifier] = {
        callback,
        active: true
    }

    defineIntervalOf(identifier, delay);

    return identifier;
}

export { _setInterval }