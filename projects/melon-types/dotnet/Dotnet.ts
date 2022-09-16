import { DotnetFetchExpression } from "./DotnetFetchExpression"
import { Realm } from "./Realm"
import { TypedNumber } from "./TypedNumber"

type Dotnet = {
    getStaticMethod: <T>(expression: DotnetFetchExpression) => (...args: any) => T,
    getStaticProperty: <T>(expression: DotnetFetchExpression) => T,
    loadAssembly: (path: string) => string,
    loadAssemblyAsync: (path: string) => Promise<string>,
    removeAssembly: (name: string) => void,
    getLoadedAssemblies: () => string[],
    types: {
        sbyte(value: number): TypedNumber,
        byte(value: number): TypedNumber,
        short(value: number): TypedNumber,
        ushort(value: number): TypedNumber,
        int(value: number): TypedNumber,
        uint(value: number): TypedNumber,
        long(value: number): TypedNumber,
        ulong(value: number): TypedNumber,
        float(value: number): TypedNumber,
        double(value: number): TypedNumber,
        decimal(value: number): TypedNumber
    },
    Realm: Realm
}
export { Dotnet }