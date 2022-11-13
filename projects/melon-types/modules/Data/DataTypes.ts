declare interface DatabaseClient {
    executeNonQuery: (sql: string) => number;
    executeQuery: <T>(sql: string) => T;
}

declare interface DatabaseDocumentClient {
    createDictionaryAsync: (name: string) => Promise<void>;
    addDocumentAsync: <TDocument>(dictionary: string, name: string, document: TDocument) => Promise<void>;
    updateDocumentAsync: <TDocument>(dictionary: string, name: string, document: TDocument) => Promise<void>;
    getDocumentAsync: <TDocument>(dictionary: string, name: string) => Promise<TDocument>;
    getDocuments: <TDocument>(dictionary: string, filter?: (item: TDocument) => boolean) => Promise<TDocument[]>;
    deleteDocumentAsync: (dictionary: string, name: string) => Promise<void>;
}

declare type DatabaseProviderOptions =  {
    host: string, 
    port: number, 
    database: string, 
    user: string,
    password: string
}