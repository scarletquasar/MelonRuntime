import { _std } from "../std/_std";
import { _readBytes } from "./_readBytes";

async function _readBytesAsync(path: string): Promise<number[]> {
    const task = _$internalBinding["ReadFileBytesAsync"](path);

    while(task.status <= 4) {
        await _std.async.nextTick(1);
    }

    return task.result;
}

export { _readBytesAsync }