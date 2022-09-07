class _SqlServerClient {
    #options;
    constructor(options) {
        this.#options = options;
    }
    executeNonQuery(sql) {
        const sendNonQueryCommand = _$internalBinding["SqlServerBindingNonQuery"];
        return sendNonQueryCommand(sql, this.#options);
    }
    executeQuery(sql) {
        const sendQueryCommand = _$internalBinding["SqlServerBindingQuery"];
        const result = sendQueryCommand(sql, this.#options);
        return JSON.parse(result);
    }
}
export { _SqlServerClient };
