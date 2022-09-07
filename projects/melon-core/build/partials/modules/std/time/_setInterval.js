import { _std } from "../_std";
function _setInterval(callback, delay) {
    const identifier = () => _std.time._timers.push({ callback }) - 1;
    _$internalBinding["SetInterval"](identifier(), delay);
}
export { _setInterval };
