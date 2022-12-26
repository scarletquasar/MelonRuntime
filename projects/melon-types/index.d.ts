/// <reference path="./modules/Http/HttpTypes.ts" />
/// <reference path="./modules/Std/StdTypes.ts" />
/// <reference path="./modules/Dotnet/DotnetTypes.ts" />
/// <reference path="./modules/Data/DataTypes.ts" />
/// <reference path="./modules/Testing/TestingTypes.ts" />

declare const console: typeof import("./modules/Console/Console").Console;
declare const crypto: typeof import("./modules/Crypto/Crypto").Crypto; 
declare const Melon: typeof import ("./modules/Melon").Melon;
declare const fs: typeof import ("./modules/Fs/Fs").Fs;

declare const setTimeout: (callback: Function, delay: number) => void;
declare const setInterval: (callback: Function, delay: number) => void;
declare const clearInterval: (identifier: string) => void;
declare const clearTimeout: (identifier: string) => void;
declare const fetch: (target: string, options?: Record<string, any>) => Promise<HttpResponse>;