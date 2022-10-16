async function _moveFileAsync(from: string, to: string) {
    _$internalBinding["MoveFile"](from, to, true);
}

export { _moveFileAsync }