/**
 * The Melon interface provides access to all the runtime features,
 * including direct reference to specification objects.
 */
declare const Melon: {
    /**
     * Constructor of the Melon.Version class.
     */
    Version: new(major: number, minor: number, patch: number) => Version,
    std: typeof import("./Std/Std").Std,
    http: typeof import("./Http/Http").Http,
    crypto: typeof import("./Crypto/Crypto").Crypto,
    guards: typeof import("./Guards/Guards").Guards,
    console: typeof import("./Console/Console").Console,
    fs: typeof import("./Fs/Fs").Fs,
    dotnet: typeof import("./Dotnet/Dotnet").Dotnet,
    data: typeof import("./Data/Data").Data
}

export { Melon }