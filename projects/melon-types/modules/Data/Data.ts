declare interface Data {
    MySqlClient: new(options: DatabaseProviderOptions) => DatabaseClient;
    PgClient: new(options: DatabaseProviderOptions) => DatabaseClient;
    SqlServerClient: new(options: DatabaseProviderOptions) => DatabaseClient;
    PgDocumentClient: new(options: DatabaseProviderOptions) => DatabaseDocumentClient;
    clone: <T>(value: T) => T;
    compare: <T>(
        target: T, 
        value: T, 
        expression: (a: T, b: T) => boolean, 
        customModifier: Function
    ) => boolean;
}