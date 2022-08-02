type Fs = {
    readAllTextSync: (path: string) => string
    writeAllTextSync: (path: string, content: string) => void,
    readAllTextAsync: (path: string) => Promise<string>
    writeAllTextAsync: (path: string, content: string) => Promise<void>,
}

declare const fs: Fs;