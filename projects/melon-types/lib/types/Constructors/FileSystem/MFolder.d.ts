declare class MFolderConstructorInternal {
    path: string;
    folderName: string;
    content: MFileConstructorInternal[];
    folders: string[];
    add: (file: MFileConstructorInternal) => void;
    save: (path: string) => void;
    static load: (path: string) => MFileConstructorInternal;
    static delete: (path: string) => void;
    static copy: (from: string, to: string) => void;
    static move: (from: string, to: string) => void;
}