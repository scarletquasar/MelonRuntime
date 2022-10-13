import { DatabaseProviderInternal } from "../../../../types/data/DatabaseProviderInternal";
import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";

class _PgClient implements DatabaseProviderInternal {
    #options: DatabaseProviderOptions;

    constructor(options: DatabaseProviderOptions) {
        this.#options = options;
    }

    executeNonQuery(sql: string) {
        const sendNonQueryCommand = _$internalBinding["PostgreSQLBindingNonQuery"];
        return sendNonQueryCommand(sql, this.#options);
    }
    
    executeQuery<T>(sql: string) {
        const sendQueryCommand = _$internalBinding["PostgreSQLBindingQuery"];
        const result = sendQueryCommand(sql, this.#options);
        
        return JSON.parse(result) as T;
    }
}

export { _PgClient }