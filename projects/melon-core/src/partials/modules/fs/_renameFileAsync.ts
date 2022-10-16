async function _renameFileAsync(path: string, newName: string) {
    _$internalBinding["RenameFile"](path, newName);
}

export { _renameFileAsync }