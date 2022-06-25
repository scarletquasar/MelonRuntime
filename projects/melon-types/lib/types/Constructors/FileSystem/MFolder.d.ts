declare interface MFolder {
    path: string,
    folderName: string,
    content: MFile[],
    folders: string[],
    add: (file: MFile) => void,
    save: (path: string) => void 
}

declare const MFolder : {
    load: (path: string) => MFile
    delete: (path: string) => void
    copy: (from: string, to: string) => void
    move: (from: string, to: string) => void
} | ((folderInfo: FolderInfo) => void)