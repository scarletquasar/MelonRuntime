declare interface MFolder {
    path: string,
    folderName: string,
    content: MFile[],
    folders: string[],
    add: (file: MFile) => void,
    save: (path: string) => void 
}