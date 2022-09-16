function _writeText(path: string, content: string) {
    _$internalBinding["WriteFileText"](path, content);
}

export { _writeText }