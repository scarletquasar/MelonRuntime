function _renameFileAsync(path: string, newName: string) {
    _$internalBinding["FileRename"](path, newName);
}

export { _renameFileAsync }