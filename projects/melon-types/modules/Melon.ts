declare const Melon: {
    Version: new(major: number, minor: number, patch: number) => Version,
    std: typeof import("./Std/Std").Std,
    http: typeof import("./Http/Http").Http,
    crypto: typeof import("./Crypto/Crypto").Crypto,
    guards: typeof import("./Guards/Guards").Guards,
    console: typeof import("./Console/Console").Console,
    fs: typeof import("./Fs/Fs").Fs,
    dotnet: typeof import("./Dotnet/Dotnet").Dotnet,
    data: typeof import("./Data/Data").Data,
    testing: typeof import("./Testing/Testing").Testing
}

export { Melon }