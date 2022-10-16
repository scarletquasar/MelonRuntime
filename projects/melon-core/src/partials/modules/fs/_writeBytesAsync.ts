import { _std } from "../std/_std";
import { _writeBytes } from "./_writeBytes"

async function _writeBytesAsync(path: string, bytes: number[]) {
    await _std.async.nextTick();
    const result = _writeBytes(path, bytes);
}

export { _writeBytesAsync }