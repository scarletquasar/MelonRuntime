import { _std } from "../std/_std";
import { _writeBytes } from "./_writeBytes"

async function _writeBytesAsync(path: string, bytes: number[]) {
    const task = _$internalBinding["WriteFileBytesAsync"](path, bytes);
    
    while(task.status <= 4) {
        await _std.async.nextTick(1);
    }
}

export { _writeBytesAsync }