import { _std } from "../std/_std";
import { _dotnetCLNConsole } from "./_dotnetCLNConsole";
import { ConsoleColor } from "../../../types/console/ConsoleColor";

function _writeLine(target: any, color: ConsoleColor = "White") {
    const result = _std.json.tryStringify(target);
    _dotnetCLNConsole("WriteLine")(result, color);
}

export { _writeLine }