type FindResult = {
    count: number,
    found: boolean
}

type Data = {
    clone: (target: any) => any,
    compare: (value1: any, value2: any, cmpFn: Function) => boolean,
    find: (object: any, target: any, count: number, found: boolean) => FindResult,
    PgClient: (host: string, port: number, database: string, username: string, password: string) => {
        executeNonQuery: (sql: string) => number,
        executeQuery: (sql: string) => any
    },
    MySQLClient: (host: string, port: number, database: string, username: string, password: string) => {
        executeNonQuery: (sql: string) => number,
        executeQuery: (sql: string) => any
    },
    SqlServerClient: (host: string, port: number, database: string, username: string, password: string) => {
        executeNonQuery: (sql: string) => number,
        executeQuery: (sql: string) => any
    }
}

declare const data: Data