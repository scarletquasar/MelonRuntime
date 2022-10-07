import { _std } from "./_std";

/* shift()
/  Creates a callback chain that will execute one or more callbacks based
/  in a condition that is related to the initial specified value.
/  
/  condition: boolean or expression that results in a boolean
/  callback: function to be executed if the option is true
/  finishOnTrue?: boolean telling if the execution will stop after the first true
*/
function _shift() {
    return {
        option: (condition: boolean, callback: () => any, finishOnTrue = false) => {
            if(condition) {
                callback();

                if(finishOnTrue)
                    return;
            }

            return _std.shift();
        }
    }
}

export { _shift }