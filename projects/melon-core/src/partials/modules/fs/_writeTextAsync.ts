import { _std } from "../std/_std";
import { _writeText } from "./_writeText"

async function _writeTextAsync(path: string, content: string) {
    await _std.async.nextTick();
    _writeText(path, content);
}

export { _writeTextAsync }