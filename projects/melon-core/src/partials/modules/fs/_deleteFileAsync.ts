async function _deleteFileAsync(path: string) {
    _$internalBinding["DeleteFile"](path);
}

export { _deleteFileAsync }