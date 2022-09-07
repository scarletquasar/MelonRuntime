class _MySqlClient {
    #options;
    constructor(options) {
        this.#options = options;
    }
    executeNonQuery(sql) {
        const sendNonQueryCommand = _$internalBinding["MySqlBindingNonQuery"];
        return sendNonQueryCommand(sql, this.#options);
    }
    executeQuery(sql) {
        const sendQueryCommand = _$internalBinding["MySqlBindingQuery"];
        const result = sendQueryCommand(sql, this.#options);
        return JSON.parse(result);
    }
}
export { _MySqlClient };
