import { _std } from "../std/_std";
import { _readText } from "./_readText";

async function _readTextAsync(path: string): Promise<string> {
    await _std.async.nextTick();
    const result = _readText(path);
    return result;
}

export { _readTextAsync }