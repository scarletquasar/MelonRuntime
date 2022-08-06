import { CompareExpression } from "./types/data/CompareExpression";
import { CompareResult } from "./types/data/CompareResult";
import { DatabaseProviderConstructor } from "./types/data/DatabaseProviderConstructor";

type Data = {
    clone<T>(target: T): T
    compare<T>(target: T, value: T, expression?: CompareExpression<T>): CompareResult,
    find(object: any, target2: any): {
        found: boolean,
        count: number
    },
    PgClient: DatabaseProviderConstructor,
    MySqlClient: DatabaseProviderConstructor,
    SqlServerClient: DatabaseProviderConstructor
}

declare const data: Data;