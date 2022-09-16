import { _std } from "../_std";

function _setTimeout(callback: Function, delay: number) {
    const identifier = () => _std.time._timers.push({ callback }) - 1;
    _$internalBinding["SetTimeout"](identifier(), delay);
}

export { _setTimeout }