import { TypedNumber } from "./types/dotnet/TypedNumber";
import { DotnetFetchExpression } from "./types/dotnet/DotnetFetchExpression";
import { DotnetGetStaticMethodResult } from "./types/dotnet/DotnetGetStaticMethodResult";
import { RealmConstructor } from "./types/dotnet/RealmConstructor";

type Dotnet = {
    getStaticMethod: <T>(expr: DotnetFetchExpression) => DotnetGetStaticMethodResult<T>,
    getStaticProperty: <T>(expr: DotnetFetchExpression) => T,
    loadAssembly: (path: string) => string,
    removeAssembly: (path: string) => void,
    getAssemblies: (path: string) => (string | null)[],
    types: {
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
    Realm: RealmConstructor
}

declare const dotnet: Dotnet;