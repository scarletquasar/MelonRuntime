function _readBytes(path: string): number[] {
    return _$internalBinding["ReadFileBytes"](path);
}

export { _readBytes }