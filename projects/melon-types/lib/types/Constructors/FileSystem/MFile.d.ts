declare interface MFile {
    path: string,
    fileName: string,
    lastWriteTime: string,
    creationTime: string,
    encoding: "utf8" | "utf32" | "ascii" | "unicode",
    bytes: number[],
    save: (path: string) => void,
    toString: () => string,
    lines: () => string[]
}

declare const MFile: (fileInfo: FileInfo) => void