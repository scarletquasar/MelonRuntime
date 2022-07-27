declare class DatabaseProviderInternal {
    executeNonQuery: (sql: string) => number;
    executeQuery: <T>(sql: string) => T;
}

type Data = {
    clone<T>(target: T): T
    compare<T>(target1: T, target2: T, compFn?: (t1: T, t2: T) => boolean): boolean,
    find(object: any, target2: any): {
        found: boolean,
        count: number
    },
    PgClient: new (
        host: string, 
        port: number, 
        database: string, 
        user: string,
        password: string
    ) => DatabaseProviderInternal,
    MySqlClient: new (
        host: string, 
        port: number, 
        database: string, 
        user: string,
        password: string
    ) => DatabaseProviderInternal,
    SqlServerClient: new (
        host: string, 
        port: number, 
        database: string, 
        user: string,
        password: string
    ) => DatabaseProviderInternal
}

declare const data: Data;