import { DotnetFetchExpression } from "./types/dotnet/DotnetFetchExpression";
import { DotnetGetStaticMethodResult } from "./types/dotnet/DotnetGetStaticMethodResult";
import { RealmConstructor } from "./types/dotnet/RealmConstructor";

type Dotnet = {
    getStaticMethod: <T>(expr: DotnetFetchExpression) => DotnetGetStaticMethodResult<T>,
    getStaticProperty: <T>(expr: DotnetFetchExpression) => T,
    loadAssembly: (path: string) => string,
    removeAssembly: (path: string) => void,
    getAssemblies: (path: string) => (string | null)[],
    Realm: RealmConstructor
}

declare const dotnet: Dotnet;