function _tryStringify<T>(target: T) {
    try {
        return JSON.stringify(target);
    }
    catch {
        return "";
    }
}

export { _tryStringify }