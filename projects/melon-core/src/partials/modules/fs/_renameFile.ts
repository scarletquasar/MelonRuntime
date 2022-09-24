function _renameFile(path: string, newName: string) {
    _$internalBinding["FileRename"](path, newName);
}

export { _renameFile }