function _renameFile(path: string, newName: string) {
    _$internalBinding["RenameFile"](path, newName);
}

export { _renameFile }