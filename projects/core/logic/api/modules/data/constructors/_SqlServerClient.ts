import { DatabaseProviderInternal } from "../../../../../../types/internal/database-types";
import { DatabaseProviderOptions } from "../../../../../../types/internal/database-types";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError";
import { _guards } from "../../guards/_guards";

const { isNullOrWhiteSpace } = _guards.string;

class _SqlServerClient implements DatabaseProviderInternal {
    #options: DatabaseProviderOptions;

    constructor(options: DatabaseProviderOptions) {
        const invalidOptions = 
        (Object.keys(options) as (string | number | boolean)[])
        .filter(option => option[1] === null || isNullOrWhiteSpace(option[1]) || option[1] === 0)
        .map(option => option[0]);
    
        if(invalidOptions.length > 0) {
            throw new InvalidArgumentError(...invalidOptions);
        }
        
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