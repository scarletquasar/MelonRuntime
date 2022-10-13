declare const Fs: {
    readText: (path: string) => string;
    writeText: (path: string, content: string) => void;
    readBytes: (path: string) => Uint8Array;
    writeBytes: (path: string, content: Uint8Array) => void;
    readTextAsync: (path: string) => Promise<string>;
    writeTextAsync: (path: string, content: string) => Promise<void>;
    readBytesAsync: (path: string) => Promise<Uint8Array>;
    writeBytesAsync: (path: string, content: Uint8Array) => Promise<void>;
    deleteFile: (path: string) => void;
    deleteFileAsync: (path: string) => Promise<void>;
    moveFile: (from: string, to: string) => void;
    moveFileAsync: (from: string, to: string) => Promise<void>;
    copyFile: (from: string, to: string) => void;
    renameFile: (path: string, newName: string) => void;
    renameFileAsync: (path: string, newName: string) => Promise<void>;
    copyFileAsync: (from: string, to: string) => Promise<void>;
    createDirectory: (path: string) => void;
    createDirectoryAsync: (path: string) => Promise<void>;
    deleteDirectory: (path: string) => void;
    deleteDirectoryAsync: (path: string) => Promise<void>;
}

export { Fs }