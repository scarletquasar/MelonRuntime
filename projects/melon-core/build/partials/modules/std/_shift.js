import { _std } from "./_std";
function _shift() {
    return {
        option: (condition, callback) => {
            condition ? callback() : {};
            return _std.shift();
        }
    };
}
export { _shift };
