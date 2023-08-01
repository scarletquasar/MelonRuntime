type UUID = `${string}-${string}-${string}-${string}-${string}`;
type MimeType = `${string}/${string}`;
type Primitive = string | number | boolean | bigint | null | symbol | Primitive[];
type TableLike = Array<unknown> | Record<any, unknown>;

interface OutputFriendly {
    toLoggableOutput(): Record<string, Primitive> | Primitive;
}

interface Prototype<T> {
    constructor: new (...args: any) => T
}

interface ScopedValue {
    dispose: Function; 
}

module test {
    export type a = 1
}

export {
    test,
    TableLike,
    ScopedValue, 
    Prototype, 
    Primitive, 
    OutputFriendly, 
    UUID, 
    MimeType
}