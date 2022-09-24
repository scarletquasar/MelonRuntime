function _moveFile(from: string, to: string) {
    _$internalBinding["MoveFile"](from, to, true);
}

export { _moveFile }