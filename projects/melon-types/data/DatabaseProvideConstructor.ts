import { DatabaseProviderInternal } from "./DatabaseProviderInternal";
import { DatabaseProviderOptions } from "./DatabaseProviderOptions";

type DatabaseProviderConstructor = new (options: DatabaseProviderOptions) => DatabaseProviderInternal;

export { DatabaseProviderConstructor }