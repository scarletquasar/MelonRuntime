import { _std } from "../std/_std";
import { _dotnetCLNConsole } from "./_dotnetCLNConsole";
import { ConsoleColor } from "../../../types/console/ConsoleColor";

function _write(target: any, color: ConsoleColor = "White") {
    const result = _std.json.tryStringify(target);
    _dotnetCLNConsole("Write")(result, color);
}

export { _write }