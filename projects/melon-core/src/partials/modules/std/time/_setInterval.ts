import { _std } from "../_std";

/* setInterval(callback, delay)
/  Repeatedly calls a function or executes a code snippet, with
/  a fixed time delay (milisseconds) between each call.
/  
/  callback: function that will be executed each time
/  delay: loop timer in milisseconds
*/
function _setInterval(callback: Function, delay: number) {
    const identifier = () => _std.time._timers.push({ callback }) - 1;
    _$internalBinding["SetInterval"](identifier(), delay);
}

export { _setInterval }