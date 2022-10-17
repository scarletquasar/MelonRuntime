import { _nextTick } from "../std/async/_nextTick";

async function _readBytesAsync(path: string): Promise<number[]> {
    const task = _$internalBinding["ReadFileBytesAsync"](path);

    while(task.status <= 4) {
        await _nextTick(1);
    }

    return task.result;
}

export { _readBytesAsync }