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

declare const MFile : {
    load: (path: string) => MFile
    delete: (path: string) => void
    copy: (from: string, to: string) => void
    move: (from: string, to: string) => void
} | ((fileInfo: FileInfo) => void)