declare class MFileConstructorInternal {
    path: string;
    fileName: string;
    lastWriteTime: string;
    creationTime: string;
    encoding: "utf8" | "utf32" | "ascii" | "unicode";
    bytes: number[];
    save: (path: string) => void;
    toString: () => string;
    lines: () => string[];
    static load: (path: string) => MFileConstructorInternal;
    static delete: (path: string) => void;
    static copy: (from: string, to: string) => void;
    static move: (from: string, to: string) => void;
}