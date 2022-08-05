import { CompareFunction } from "./types/data/CompareFunction";
import { DatabaseProviderConstructor } from "./types/data/DatabaseProviderConstructor";
import { TypedNumber } from "./types/data/TypedNumber";

type Data = {
    clone<T>(target: T): T
    compare<T>(target1: T, target2: T, compFn?: CompareFunction<T>): boolean,
    find(object: any, target2: any): {
        found: boolean,
        count: number
    },
    numbers: {
        SByte(value: number): TypedNumber,
        Byte(value: number): TypedNumber,
        Short(value: number): TypedNumber,
        UShort(value: number): TypedNumber,
        Int(value: number): TypedNumber,
        UInt(value: number): TypedNumber,
        Long(value: number): TypedNumber,
        ULong(value: number): TypedNumber,
        Float(value: number): TypedNumber,
        Double(value: number): TypedNumber,
        Decimal(value: number): TypedNumber
    }
    PgClient: DatabaseProviderConstructor,
    MySqlClient: DatabaseProviderConstructor,
    SqlServerClient: DatabaseProviderConstructor
}

declare const data: Data;