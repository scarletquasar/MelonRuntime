type Fs = {
    read: (path: string) => string,
    write: (path: string, content: string) => void
}

declare const fs: Fs