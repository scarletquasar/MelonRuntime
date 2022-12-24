declare interface OSVersion {
    Platform: Platform,
    VersionString: string,
    ServicePack: string
}

declare enum Platform {
    Win32S = 0,
    Win32Windows = 1,
    Win32NT = 2,
    WinCE = 3,
    Unix = 4,
    Xbox = 5,
    MacOSX = 6,
    Other = 7
}

declare interface Timer {
    cancel: () => void;
}

declare class TextEncoder {
    encode: (string: string) => number[]
}

declare class TextDecoder {
    decode: (octet: number[]) => string
}

declare class SharedBag<T> {
    constructor(...content: T[]);
    beginTransaction(): void;
    closeTransaction(): void;
    addFirst(item: T): number;
    addLast(item: T): number;
}

declare class Either<TLeft, TRight> {
    static left<T>(value: T): Either<T, unknown>;
    static right<T>(value: T): Either<unknown, T>;
    fold<T>(left: (x: TLeft) => T | void, right: (x: TRight) => T | void): T | void;
}

declare class Result<TError extends Error, TResult> extends Either<TError, TResult> {
    static left<T>(value: T): Either<T, unknown>;
    static right<T>(value: T): Either<unknown, T>;
    match<T>(left: (x: TError) => T | void, right: (x: TResult) => T | void): T | void;
    join(message?: string): void;
}