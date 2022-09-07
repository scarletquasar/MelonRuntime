import { _std } from "../_std";
function _setTimeout(callback, delay) {
    const identifier = () => _std.time._timers.push({ callback }) - 1;
    _$internalBinding["SetTimeout"](identifier(), delay);
}
export { _setTimeout };
