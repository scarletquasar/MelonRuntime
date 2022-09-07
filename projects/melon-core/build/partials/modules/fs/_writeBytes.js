async function _writeBytes(path, bytes) {
    _$internalBinding["WriteFileBytes"](path, bytes);
}
export { _writeBytes };
