function _tryParse(json) {
    try {
        return JSON.parse(json);
    }
    catch {
        return {};
    }
}
export { _tryParse };
