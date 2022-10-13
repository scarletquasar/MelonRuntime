import { _std } from "../_std";

/* setTimeout(callback, delay)
/  Sets a timer (milisseconds) which executes a function or 
/  specified piece of code once the timer expires.
/  
/  callback: function that will be executed
/  delay: timer in milisseconds
*/
function _setTimeout(callback: Function, delay: number) {
    const identifier = () => _std.time._timers.push({ callback }) - 1;
    _$internalBinding["SetTimeout"](identifier(), delay);
}

export { _setTimeout }