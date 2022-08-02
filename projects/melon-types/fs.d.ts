type Fs = {
    readAllTextSync: (path: string) => string
    writeAllTextSync: (path: string, content: string) => void,
    readAllTextAsync: (path: string) => Promise<string>
    writeAllTextAsync: (path: string, content: string) => Promise<void>,
    readAllBytesSync: (path: string) => number[]
    writeAllBytesSync: (path: string, content: number[]) => void,
    readAllBytesAsync: (path: string) => Promise<number[]>
    writeAllBytesAsync: (path: string, bytes: number[]) => Promise<void>,
}

declare const fs: Fs;