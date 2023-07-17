import { DotnetFetchExpression, InteropFactory, InteropMethod } from "../internal/dotnet-interop-types";

type DotnetGetFactories = (namespace: string) => Record<string, InteropFactory<unknown>>;
type DotnetGetStaticMethod = <T>(expression: DotnetFetchExpression) => InteropMethod<T>;
type DotnetGetStaticProperty = <T>(expression: DotnetFetchExpression) => T;
type DotnetLoadAssembly = (path: string) => void;
type DotnetLoadAssemblyAsync = (path: string) => Promise<void>;
type DotnetRemoveAssembly = (fullName: string) => void;
type DotnetGetLoadedAssemblies = () => string[];
type DotnetCreateList = <T>(base: T[]) => any;

export {
    DotnetGetFactories,
    DotnetGetStaticMethod,
    DotnetGetStaticProperty,
    DotnetLoadAssembly,
    DotnetLoadAssemblyAsync,
    DotnetRemoveAssembly,
    DotnetGetLoadedAssemblies,
    DotnetCreateList
}