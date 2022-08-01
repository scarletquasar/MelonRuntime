import { DotnetFetchExpression } from "./types/dotnet/DotnetFetchExpression";
import { DotnetGetStaticMethodResult } from "./types/dotnet/DotnetGetStaticMethodResult";

type Dotnet = {
    getStaticMethod: <T>(expr: DotnetFetchExpression) => DotnetGetStaticMethodResult<T>,
    getStaticProperty: <T>(expr: DotnetFetchExpression) => T,
    loadAssembly: (path: string) => string,
    removeAssembly: (path: string) => void,
    getAssemblies: (path: string) => (string | null)[]
}

declare const dotnet: Dotnet;