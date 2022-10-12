/// <reference path="./modules/Console/Console.ts" />
/// <reference path="./modules/Crypto/Crypto.ts" />
/// <reference path="./modules/Http/Http.ts" />
/// <reference path="./modules/Std/Std.ts" />

/**
 * The console interface provides access to the debugging/output console
 * and is focused in showing information on the screen, using console
 * timers and debugging data.
 */
declare const console: Console;
/**
 * The Crypto interface represents basic cryptography features 
 * available in the current context. It allows access to a 
 * cryptographically strong random number generator and to 
 * cryptographic primitives.
 */
declare const crypto: Crypto; 
/**
 * The Melon interface provides access to all the runtime features,
 * including direct reference to specification objects.
 */
declare const Melon: Melon;

declare const setTimeout: typeof Melon.std.time.setTimeout;
declare const setInterval: typeof Melon.std.time.setInterval;