/// <reference path="./modules/Http/HttpTypes.ts" />
/// <reference path="./modules/Std/StdTypes.ts" />
/// <reference path="./modules/Dotnet/DotnetTypes.ts" />

/**
 * The console interface provides access to the debugging/output console
 * and is focused in showing information on the screen, using console
 * timers and debugging data.
 */
declare const console: typeof import("./modules/Console/Console").Console;
/**
 * The Crypto interface represents basic cryptography features 
 * available in the current context. It allows access to a 
 * cryptographically strong random number generator and to 
 * cryptographic primitives.
 */
declare const crypto: typeof import("./modules/Crypto/Crypto").Crypto; 
/**
 * The Melon interface provides access to all the runtime features,
 * including direct reference to specification objects.
 */
declare const Melon: typeof import ("./modules/Melon").Melon;

declare const fs: typeof import ("./modules/Fs/Fs").Fs;

declare const setTimeout: (callback: Function, delay: number) => void;
declare const setInterval: (callback: Function, delay: number) => void;
declare const fetch: (target: string, options?: Record<string, any>) => Promise<HttpResponse>;

declare class TextEncoder {
    encode: (string: string) => number[]
}

declare class TextDecoder {
    decode: (octet: number[]) => string
}