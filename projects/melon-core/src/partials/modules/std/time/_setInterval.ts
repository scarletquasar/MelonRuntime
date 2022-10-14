import { _std } from "../_std";
import { _Timer } from "./_Timer";

/* setInterval(callback, delay)
/  Repeatedly calls a function or executes a code snippet, with
/  a fixed time delay (milisseconds) between each call.
/  
/  callback: function that will be executed each time
/  delay: loop timer in milisseconds
*/
function _setInterval(callback: Function, delay: number) {
    const timer = new _Timer(callback, delay, true);
    return timer;
}

export { _setInterval }