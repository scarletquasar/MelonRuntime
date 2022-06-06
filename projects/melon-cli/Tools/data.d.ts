type FindResult = {
    count: number,
    found: boolean
}

type Data = {
    clone: (target: any) => any,
    compare: (value1: any, value2: any, cmpFn: Function) => boolean,
    find: (object: any, target: any, count: number, found: boolean) => FindResult,
    PgClient: (connectionString: string) => {
        executeNonQuery: (sql: string) => number,
        executeQuery: (sql: string) => any
    }
}

declare const data: Data