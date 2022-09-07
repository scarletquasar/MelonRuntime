import { _std } from "../std/_std";
import { _dotnetCLNConsole } from "./_dotnetCLNConsole";
function _writeLine(target, color = "White") {
    const result = _std.json.tryStringify(target);
    _dotnetCLNConsole("WriteLine")(result, color);
}
export { _writeLine };
