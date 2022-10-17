import { _nextTick } from "../std/async/_nextTick";

async function _loadAssemblyAsync(path: string): Promise<string> {
    const task = _$internalBinding["LoadAssemblyAsync"](path);
    
    while(task.status <= 4) {
        await _nextTick(1);
    }

    const result = task.result;

    return result;
}

export { _loadAssemblyAsync }