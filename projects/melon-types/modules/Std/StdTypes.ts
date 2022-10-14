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