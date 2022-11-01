function _renameDirectory(path: string, newName: string) {
    _$internalBinding["RenameDirectory"](path, newName);
}

export { _renameDirectory }