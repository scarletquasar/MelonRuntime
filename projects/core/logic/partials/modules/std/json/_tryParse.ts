function _tryParse<T>(json: string) {
    try {
        return JSON.parse(json) as T;
    }
    catch {
        return {} as T;
    }
}

export { _tryParse }