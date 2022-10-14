import { _std } from "../_std";
import { _Timer } from "./_Timer";

/* setTimeout(callback, delay)
/  Sets a timer (milisseconds) which executes a function or 
/  specified piece of code once the timer expires.
/  
/  callback: function that will be executed
/  delay: timer in milisseconds
*/
function _setTimeout(callback: Function, delay: number) {
    const timer = new _Timer(callback, delay, false);
    return timer;
}

export { _setTimeout }