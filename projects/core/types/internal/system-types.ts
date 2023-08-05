type InternalOSVersion = {
    Platform: Platform,
    VersionString: string,
    ServicePack: string
}

enum Platform {
    Win32S,
    Win32Windows,
    Win32NT,
    WinCE,
    Unix,
    Xbox,
    MacOSX,
    Other
}

export { InternalOSVersion, Platform }