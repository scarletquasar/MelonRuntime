import { _nextTick } from "../std/async/_nextTick";

async function _writeBytesAsync(path: string, bytes: number[]) {
    const task = _$internalBinding["WriteFileBytesAsync"](path, bytes);
    
    while(task.status <= 4) {
        await _nextTick(1);
    }
}

export { _writeBytesAsync }