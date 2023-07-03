type TypedNumber = {
    type: string,
    value: number
}

type DotnetNumericTypes = {
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
}

type DotnetInstanceExpression = `${string}:${string}`;
type DotnetGetStaticMethodResult<T> = (...args: any) => T;
type DotnetFetchExpression = `${string}:${string}:${string}`;
type InteropMethod<T> = (...args: unknown[]) => T;

export { 
    TypedNumber, 
    DotnetNumericTypes, 
    DotnetInstanceExpression,
    DotnetFetchExpression,
    DotnetGetStaticMethodResult,
    InteropMethod
}