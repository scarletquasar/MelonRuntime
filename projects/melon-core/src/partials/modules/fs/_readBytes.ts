async function _readBytes(path: string): Promise<number[]> {
    return _$internalBinding["ReadFileBytes"](path);
}

export { _readBytes }