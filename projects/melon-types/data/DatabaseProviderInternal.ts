declare interface DatabaseProviderInternal {
    executeNonQuery: (sql: string) => number;
    executeQuery: <T>(sql: string) => T;
}