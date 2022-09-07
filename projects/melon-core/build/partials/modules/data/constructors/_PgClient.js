class _PgClient {
    #options;
    constructor(options) {
        this.#options = options;
    }
    executeNonQuery(sql) {
        const sendNonQueryCommand = _$internalBinding["PostgreSQLBindingNonQuery"];
        return sendNonQueryCommand(sql, this.#options);
    }
    executeQuery(sql) {
        const sendQueryCommand = _$internalBinding["PostgreSQLBindingQuery"];
        const result = sendQueryCommand(sql, this.#options);
        return JSON.parse(result);
    }
}
export { _PgClient };
