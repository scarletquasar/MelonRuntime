/**
 * The Melon interface provides access to all the runtime features,
 * including direct reference to specification objects.
 */
declare interface Melon {
    /**
     * Constructor of the Melon.Version class.
     */
    Version: new(major: number, minor: number, patch: number) => Version,
    std: Std,
    http: Http,
    crypto: Crypto,
    guards: Guards,
    console: Console
}