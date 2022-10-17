import { _nextTick } from "../std/async/_nextTick";

async function _loadAssemblyAsync(path: string): Promise<string> {
    await _nextTick();
    const result = _$internalBinding["LoadAssembly"](path);
    return result;
}

export { _loadAssemblyAsync }