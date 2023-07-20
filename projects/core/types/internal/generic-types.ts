type UUID = `${string}-${string}-${string}-${string}-${string}`;
type MimeType = `${string}/${string}`;
type Primitive = string | number | boolean | bigint | null | symbol | Primitive[];
type TableLike<TRow extends string | number | symbol, TColumn> = Array<TColumn> | Record<TRow, TColumn>;

interface OutputFriendly {
    toLoggableOutput(): Record<string, Primitive> | Primitive;
}

interface Prototype<T> {
    constructor: new (...args: any) => T
}

interface ScopedValue {
    dispose: Function; 
}

export {
    TableLike,
    ScopedValue, 
    Prototype, 
    Primitive, 
    OutputFriendly, 
    UUID, 
    MimeType
}