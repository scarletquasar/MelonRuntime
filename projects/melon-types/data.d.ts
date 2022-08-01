import { CompareFunction } from "./types/data/CompareFunction";
import { DatabaseProviderConstructor } from "./types/data/DatabaseProviderConstructor";

type Data = {
    clone<T>(target: T): T
    compare<T>(target1: T, target2: T, compFn?: CompareFunction<T>): boolean,
    find(object: any, target2: any): {
        found: boolean,
        count: number
    },
    PgClient: DatabaseProviderConstructor,
    MySqlClient: DatabaseProviderConstructor,
    SqlServerClient: DatabaseProviderConstructor
}

declare const data: Data;