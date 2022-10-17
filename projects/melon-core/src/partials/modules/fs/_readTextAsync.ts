import { _nextTick } from "../std/async/_nextTick";

async function _readTextAsync(path: string): Promise<string> {
    const task = _$internalBinding["ReadFileTextAsync"](path);

    while(task.status <= 4) {
        await _nextTick(1);
    }

    return task.result;
}

export { _readTextAsync }