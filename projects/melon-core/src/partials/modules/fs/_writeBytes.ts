async function _writeBytes(path: string, bytes: number[]) {
    _$internalBinding["WriteFileBytes"](path, bytes);
}

export { _writeBytes }