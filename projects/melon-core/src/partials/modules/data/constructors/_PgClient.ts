import { DatabaseProviderInternal } from "../../../../types/data/DatabaseProviderInternal";
import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError";

class _PgClient implements DatabaseProviderInternal {
    #options: DatabaseProviderOptions;

    constructor(options: DatabaseProviderOptions) {
        const invalidOptions = 
        (Object.keys(options) as (string | number | boolean)[])
        .filter(option => option[1] === null || option[1] === "" || option[1] === 0)
        .map(option => option[0]);
    
        if(invalidOptions.length > 0) {
            throw new InvalidArgumentError(...invalidOptions);
        }

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