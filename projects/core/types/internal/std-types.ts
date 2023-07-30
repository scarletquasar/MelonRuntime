interface SharedBag<T> {
    beginTransaction(): string;
    closeTransaction(): void;
    addFirst(item: T): number;
    addLast(item: T): number;
}

type SharedBagConstructor = new <T>(...content: T[]) => SharedBag<T>;

interface TextEncoder {
    encode(string: string): number[];
}

interface TextDecoder {
    decode(octets: number[]): string;
}

type TextDecoderConstructor = new () => TextDecoder;
type TextEncoderConstructor = new () => TextEncoder;


export { 
    SharedBag, 
    SharedBagConstructor,
    TextDecoder,
    TextDecoderConstructor,
    TextEncoder,
    TextEncoderConstructor 
}