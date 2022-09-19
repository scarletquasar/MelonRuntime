import { TypedNumber } from "./TypedNumber";
declare type DotnetNumericTypes = {
    sbyte(value: number): TypedNumber;
    byte(value: number): TypedNumber;
    short(value: number): TypedNumber;
    ushort(value: number): TypedNumber;
    int(value: number): TypedNumber;
    uint(value: number): TypedNumber;
    long(value: number): TypedNumber;
    ulong(value: number): TypedNumber;
    float(value: number): TypedNumber;
    double(value: number): TypedNumber;
    decimal(value: number): TypedNumber;
};
export { DotnetNumericTypes };
