function _deleteDirectory(path: string) {
    _$internalBinding["DeleteDirectory"](path, true);
}

export { _deleteDirectory }