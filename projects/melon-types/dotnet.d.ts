import { DotnetNumericTypes } from "../melon-core/types/dotnet/DotnetNumericTypes";
import { DotnetFetchExpression } from "../melon-core/types/dotnet/DotnetFetchExpression";
import { DotnetGetStaticMethodResult } from "../melon-core/types/dotnet/DotnetGetStaticMethodResult";
import { RealmConstructor } from "../melon-core/types/dotnet/RealmConstructor";

type Dotnet = {
    getStaticMethod: <T>(expr: DotnetFetchExpression) => DotnetGetStaticMethodResult<T>,
    getStaticProperty: <T>(expr: DotnetFetchExpression) => T,
    loadAssembly: (path: string) => string,
    removeAssembly: (path: string) => void,
    getLoadedAssemblies: () => (string | null)[],
    types: DotnetNumericTypes,
    Realm: RealmConstructor
}

declare const dotnet: Dotnet;