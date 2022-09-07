import { _std } from "../std/_std";
import { _dotnetCLNConsole } from "./_dotnetCLNConsole";
function _log(...args) {
    Array.from(args).forEach(object => {
        const result = _std.json.tryStringify(object);
        _dotnetCLNConsole("WriteLine")(result, "White");
    });
}
;
export { _log };
