type Fs = {
    readText: (path: string) => string,
    writeText: (path: string, content: string) => void,
    readBytes: (path: string) => number[],
    writeBytes: (path: string, content: number[]) => void,
    readTextAsync: (path: string) => Promise<string>,
    writeTextAsync: (path: string, content: string) => Promise<void>,
    readBytesAsync: (path: string) => Promise<number[]>,
    writeBytesAsync: (path: string, content: number[]) => Promise<void>
}

export { Fs }