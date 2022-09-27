function _deleteFile(path: string) {
    _$internalBinding["DeleteFile"](path);
}

export { _deleteFile }