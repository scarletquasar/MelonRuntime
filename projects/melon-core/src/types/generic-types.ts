type Primitive = string | number | boolean | bigint | null | symbol;


interface OutputFriendly {
    toLoggableOutput(): Record<string, Primitive> | Primitive;
}

export { Primitive, OutputFriendly }