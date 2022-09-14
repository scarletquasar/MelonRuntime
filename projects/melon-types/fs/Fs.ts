type Fs = {
    readText: (path: string) => Promise<string>,
    writeText: (path: string, content: string) => Promise<void>,
    readBytes: (path: string) => Promise<number[]>,
    writeBytes: (path: string, content: number[]) => Promise<void>
}

export { Fs }