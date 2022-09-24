function _deleteDirectoryAsync(path: string) {
    _$internalBinding["DeleteDirectory"](path, true);
}

export { _deleteDirectoryAsync }