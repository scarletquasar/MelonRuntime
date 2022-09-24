function _copyFileAsync(from: string, to: string) {
    _$internalBinding["CopyFile"](from, to, true);
}

export { _copyFileAsync }