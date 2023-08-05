import { _PgDocumentClient } from "../../logic/src/partials/modules/data/constructors/_PgDocumentClient";
import { DatabaseProviderInternal, DatabaseProviderOptions } from "../internal/database-types";

type DataClone = <T>(value: T) => T;

type DataCompare = <T>(target: T, value: T, expression?: (a: T, b: T) => boolean, customModifier?: Function) => {
    comment: string;
    equals: boolean;
}

type DataMySqlClient = new(options: DatabaseProviderOptions) => DatabaseProviderInternal;
type DataPgClient = new(options: DatabaseProviderOptions) => DatabaseProviderInternal;
type DataSqlServerClient = new(options: DatabaseProviderOptions) => DatabaseProviderInternal;
type DataPgDocumentClient = new(options: DatabaseProviderOptions) => _PgDocumentClient;

export {
    DataClone,
    DataCompare,
    DataMySqlClient,
    DataPgClient,
    DataSqlServerClient,
    DataPgDocumentClient
}