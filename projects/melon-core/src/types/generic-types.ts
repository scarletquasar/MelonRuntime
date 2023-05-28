type Primitive = string | number | boolean | bigint | null | symbol | Primitive[];


interface OutputFriendly {
    toLoggableOutput(): Record<string, Primitive> | Primitive;
}

export { Primitive, OutputFriendly }