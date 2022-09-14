async function _readText(path: string): Promise<string> {
    return _$internalBinding["ReadFileText"](path);
}

export { _readText }