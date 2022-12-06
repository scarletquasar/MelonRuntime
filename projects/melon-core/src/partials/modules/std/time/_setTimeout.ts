import { _crypto } from "../../../statics/_crypto";
import { _std } from "../_std";
import { Timer } from "./Timer";

const defineTimeoutOf = _$internalBinding["DefineTimeoutOf"];

function _setTimeout(callback: Function, delay: number) {
    const identifier = _crypto.randomUUID();
    _std.time._timers[identifier] = new Timer(callback);
    defineTimeoutOf(identifier, delay);

    return identifier;
}

export { _setTimeout }