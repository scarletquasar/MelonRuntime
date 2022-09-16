function _readText(path: string): string {
    return _$internalBinding["ReadFileText"](path);
}

export { _readText }