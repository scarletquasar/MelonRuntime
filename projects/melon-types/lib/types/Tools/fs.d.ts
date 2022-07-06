type Fs = {
    readAllTextSync: (path: string) => string,
    writeAllTextSync: (path: string, content: string) => void
}