import { DatabaseProviderInternal } from "../../../../types/data/DatabaseProviderInternal";
import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";

class _SqlServerClient implements DatabaseProviderInternal {
    #options: DatabaseProviderOptions;

    constructor(options: DatabaseProviderOptions) {
        this.#options = options;
    }

    executeNonQuery(sql: string) {
        const sendNonQueryCommand = _$internalBinding["SqlServerBindingNonQuery"];
        return sendNonQueryCommand(sql, this.#options);
    }
    
    executeQuery<T>(sql: string) {
        const sendQueryCommand = _$internalBinding["SqlServerBindingQuery"];
        const result = sendQueryCommand(sql, this.#options);

        return JSON.parse(result) as T;
    }
}

export { _SqlServerClient }