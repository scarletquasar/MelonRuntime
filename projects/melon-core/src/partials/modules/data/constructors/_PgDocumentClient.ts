import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";
import { InvalidArgumentError } from "../../../errors/InvalidArgumentError";
import { _internalConsts } from "../../internalConsts/_internalConsts";
import { _std } from "../../std/_std";
import { _PgClient } from "./_PgClient";

class _PgDocumentClient {
    #provider: _PgClient;

    constructor(options: DatabaseProviderOptions) {
        this.#provider = new _PgClient(options);
    }

    #__checkStringPattern(string: string) {
        return /^[A-Za-z0-9]*$/.test(string);
    }

    /* Dictionaries: Alias to tables, in this context are collections to
    /  englobe "Documents" following a coherent design to quick data 
    /  storage environments and cases. */

    async createDictionaryAsync(name: string) {
        if(!this.#__checkStringPattern(name)) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            CREATE TABLE ${name} (
                name varchar(255) PRIMARY KEY,
                document JSONB
            );
        `;

        await _std.async.nextTick();
        this.#provider.executeNonQuery(script);
    }

    //Documents

    async addDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const documentString = JSON.stringify(document);

        const script = `
            INSERT INTO ${dictionary} (name, document) 
            VALUES ('${name}', '${documentString}')
        `;

        await _std.async.nextTick();
        this.#provider.executeNonQuery(script);
    }

    async updateDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const documentString = JSON.stringify(document);

        const script = `
            UPDATE ${dictionary} SET document = '${documentString}'
            WHERE name = '${name}'
        `;

        await _std.async.nextTick();
        this.#provider.executeNonQuery(script);
    }

    async getDocumentAsync<TDocument>(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            SELECT document FROM ${dictionary} WHERE name = '${name}'
        `;

        await _std.async.nextTick();
        return this.#provider.executeQuery<TDocument>(script)[0].document;
    }

    async deleteDocumentAsync(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new InvalidArgumentError("The name is invalid, should contain only letters and numbers");
        }

        const script = `
            DELETE FROM ${dictionary} WHERE name = '${name}'
        `;

        await _std.async.nextTick();
        this.#provider.executeNonQuery(script);
    }
}

export { _PgDocumentClient }