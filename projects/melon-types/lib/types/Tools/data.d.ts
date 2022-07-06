type FindResult = {
    count: number,
    found: boolean
}

type Data = {
    clone: (target: any) => any,
    compare: (value1: any, value2: any, cmpFn: Function) => boolean,
    find: (object: any, target: any, count: number, found: boolean) => FindResult,
    PgClient: (host: string, port: number, database: string, username: string, password: string) => void,
    MySQLClient: (host: string, port: number, database: string, username: string, password: string) => void,
    SqlServerClient: (host: string, port: number, database: string, username: string, password: string) => void
}

declare type DatabaseClient = {
    executeNonQuery: (sql: string) => number,
    executeQuery: (sql: string) => any
}