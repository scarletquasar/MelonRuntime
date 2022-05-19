class Folder {
    constructor(folderInfo = { name: "", content: [] }) {
        folderInfo.content.forEach(file => {
            if (!(file instanceof File)) {
                this._errValidFiles();
            }
        });

        this.folderName = folderInfo.name;
        this.content = folderInfo.content;
    }

    add(file) {
        if (file instanceof File) {
            this.content.push(file);
            return;
        }

        this._errValidFiles();
    }

    save(path) {
        melon_internal_create_folder(path);
        this.content.forEach(file => file.save(path + file.fileName));
    }

    _errValidFiles() {
        throw new Error("Only valid files can be added to a Folder object.");
    }
}