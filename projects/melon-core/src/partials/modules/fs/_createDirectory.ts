function _createDirectory(path: string) {
    _$internalBinding["CreateDirectory"](path);
}

export { _createDirectory }