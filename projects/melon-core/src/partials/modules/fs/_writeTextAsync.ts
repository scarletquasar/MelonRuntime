import { _nextTick } from "../std/async/_nextTick";

async function _writeTextAsync(path: string, content: string) {
    const task = _$internalBinding["WriteFileTextAsync"](path, content);
    
    while(task.status <= 4) {
        await _nextTick(1);
    }
}

export { _writeTextAsync }