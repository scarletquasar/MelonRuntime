import { _std } from "../std/_std";
import { _dotnetCLNConsole } from "./_dotnetCLNConsole";
function _write(target, color = "White") {
    const result = _std.json.tryStringify(target);
    _dotnetCLNConsole("Write")(result, color);
}
export { _write };
