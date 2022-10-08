/**
 * The Crypto interface represents basic cryptography features 
 * available in the current context. It allows access to a 
 * cryptographically strong random number generator and to 
 * cryptographic primitives.
 */
declare interface Crypto {
    randomUUID: () => string;
}