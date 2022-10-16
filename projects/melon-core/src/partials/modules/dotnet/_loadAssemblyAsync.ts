import { _std } from "../std/_std";

async function _loadAssemblyAsync(path: string): Promise<string> {
    await _std.async.nextTick();
    const result = _$internalBinding["LoadAssembly"](path);
    return result;
}

export { _loadAssemblyAsync }