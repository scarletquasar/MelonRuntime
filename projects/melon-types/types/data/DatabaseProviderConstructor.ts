import { DatabaseProviderArguments } from "./DatabaseProviderArguments";
import { DatabaseProviderInternal } from "./DatabaseProviderInternal";

type DatabaseProviderConstructor = new (options: DatabaseProviderArguments) => DatabaseProviderInternal;

export { DatabaseProviderConstructor }