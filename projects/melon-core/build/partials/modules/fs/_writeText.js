async function _writeText(path, content) {
    _$internalBinding["WriteFileText"](path, content);
}
export { _writeText };
