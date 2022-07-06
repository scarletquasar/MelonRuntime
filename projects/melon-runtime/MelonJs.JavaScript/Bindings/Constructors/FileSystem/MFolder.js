Melon.MFolder = class {
    constructor(folderInfo) {
        this.folderName = folderInfo.name ?? "";
        this.path = folderInfo.path ?? "";
        this.content = folderInfo.content ?? [];
        this.folders = folderInfo.folders ?? [];

        folderInfo.content.forEach(file => {
            if (!(file instanceof Melon.MFile)) {
                this._errValidFiles();
            }
        });

        folderInfo.folders.forEach(file => {
            if (!(file instanceof Melon.MFolder)) {
                this._errValidFiles();
            }
        });
    }

    add(target) {
        if (file instanceof Melon.MFile) {
            this.content.push(target);
            return;
        }

        if (file instanceof Melon.MFolder) {
            this.folders.push(target.folderPath);
            return;
        }

        this._errValidFiles();
    }

    save(path) {
        __create_folder__(path ?? this.path);
        this.content.forEach(file => file.save(path + file.fileName));
    }

    _errValidFiles() {
        throw new Error("Only valid files or folders can be added to a Folder object.");
    }
}

Melon.MFolder.load = (path) => {
    const loadedFolder = new __folder__(path);

    return new Melon.MFolder({
        name: loadedFolder.Name,
        path: loadedFolder.FolderPath,
        content: loadedFolder.Content
    });
}