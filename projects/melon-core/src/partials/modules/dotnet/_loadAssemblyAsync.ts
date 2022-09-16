async function _loadAssemblyAsync(path: string): Promise<string> {
    const result = _$internalBinding["LoadAssembly"](path);
    return result;
}

export { _loadAssemblyAsync }