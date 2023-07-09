type UUID = `${string}-${string}-${string}-${string}-${string}`;
type MimeType = `${string}/${string}`;
type Primitive = string | number | boolean | bigint | null | symbol | Primitive[];

interface OutputFriendly {
    toLoggableOutput(): Record<string, Primitive> | Primitive;
}

export { Primitive, OutputFriendly, UUID, MimeType }