class Folder {
    constructor(folderInfo = { name: "", content: [] /* File() array */ }) {
        this.folderName = folderInfo.name;
        this.content = folderInfo.content;
    }

    save(path) {
        melon_internal_create_folder(path);
        content.forEach(file => file.save(path + file.fileName));
    }
}