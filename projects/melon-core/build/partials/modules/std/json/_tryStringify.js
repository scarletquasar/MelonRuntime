function _tryStringify(target) {
    try {
        return JSON.stringify(target);
    }
    catch {
        return "";
    }
}
export { _tryStringify };
