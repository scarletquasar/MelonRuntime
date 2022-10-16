import { DatabaseProviderOptions } from "../../../../types/data/DatabaseProviderOptions";
import { _internalConsts } from "../../internalConsts/_internalConsts";
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
            throw new Error(_internalConsts.INVALID_PGDOCUMENTCLIENT_IDENTIFIER_NAME);
        }

        const script = `
            CREATE TABLE ${name} (
                name varchar(255) PRIMARY KEY,
                document JSONB
            );
        `;

        this.#provider.executeNonQuery(script);
    }

    //Documents

    async addDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new Error(_internalConsts.INVALID_PGDOCUMENTCLIENT_IDENTIFIER_NAME);
        }

        const documentString = JSON.stringify(document);

        const script = `
            INSERT INTO ${dictionary} (name, document) 
            VALUES ('${name}', '${documentString}')
        `;

        this.#provider.executeNonQuery(script);
    }

    async updateDocumentAsync<TDocument>(dictionary: string, name: string, document: TDocument) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new Error(_internalConsts.INVALID_PGDOCUMENTCLIENT_IDENTIFIER_NAME);
        }

        const documentString = JSON.stringify(document);

        const script = `
            UPDATE ${dictionary} SET document = '${documentString}'
            WHERE name = '${name}'
        `;

        this.#provider.executeNonQuery(script);
    }

    async getDocumentAsync<TDocument>(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new Error(_internalConsts.INVALID_PGDOCUMENTCLIENT_IDENTIFIER_NAME);
        }

        const script = `
            SELECT document FROM ${dictionary} WHERE name = '${name}'
        `;

        return this.#provider.executeQuery<TDocument>(script)[0].document;
    }

    async deleteDocumentAsync(dictionary: string, name: string) {
        if(
            !this.#__checkStringPattern(dictionary) ||
            !this.#__checkStringPattern(name)
        ) {
            throw new Error(_internalConsts.INVALID_PGDOCUMENTCLIENT_IDENTIFIER_NAME);
        }

        const script = `
            DELETE FROM ${dictionary} WHERE name = '${name}'
        `;

        this.#provider.executeNonQuery(script);
    }
}

export { _PgDocumentClient }