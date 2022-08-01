class DatabaseProviderInternal {
    executeNonQuery: (sql: string) => number;
    executeQuery: <T>(sql: string) => T;
}

export { DatabaseProviderInternal }