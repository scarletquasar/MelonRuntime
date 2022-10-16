import { _std } from "../std/_std";
import { _readBytes } from "./_readBytes";

async function _readBytesAsync(path: string): Promise<number[]> {
    await _std.async.nextTick();
    const result = _readBytes(path);
    return result;
}

export { _readBytesAsync }