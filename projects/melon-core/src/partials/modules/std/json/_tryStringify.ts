function _tryStringify<T>(target: any) {
    try {
        return JSON.stringify(target);
    }
    catch {
        return "";
    }
}

export { _tryStringify }