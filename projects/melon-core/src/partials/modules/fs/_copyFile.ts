function _copyFile(from: string, to: string) {
    _$internalBinding["CopyFile"](from, to, true);
}

export { _copyFile }