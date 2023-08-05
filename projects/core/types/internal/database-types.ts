interface DatabaseProviderInternal {
    executeNonQuery: (sql: string) => number;
    executeQuery: <T>(sql: string) => T;
}

type DatabaseProviderOptions =  {
    host: string, 
    port: number, 
    database: string, 
    user: string,
    password: string
}

export { DatabaseProviderInternal, DatabaseProviderOptions }