import { DatabaseProviderInternal } from "./DatabaseProviderInternal";

type DatabaseProviderConstructor = new (
    host: string, 
    port: number, 
    database: string, 
    user: string,
    password: string
) => DatabaseProviderInternal;

export { DatabaseProviderConstructor }