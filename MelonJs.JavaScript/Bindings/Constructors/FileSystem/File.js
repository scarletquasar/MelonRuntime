class File {
    constructor(fileInfo = { name: "", content: null, encoding: "utf8" }) {
        //Path
        this.path = null;

        //File Information
        this.fileName = fileInfo.name;
        this.lastWriteTime = fileInfo.lastWriteTime;
        this.creationTime = fileInfo.creationTime;
        this.encoding = fileInfo.encoding;

        //Operations
        this.path = fileInfo.path;

        const bytes = fileInfo.content != null
            ? melon_internal_convert.FromStringToByteArray(fileInfo.content, fileInfo.encoding)
            : fileInfo.bytes;

        const size = (bytes?.length / 1024);

        this.fileName = fileInfo.name;
        this.fileSize = size;
        this.bytes = bytes;
    }

    save(path) {
        melon_internal_save_file(path, this.bytes);
    }

    toString() {
        return melon_internal_convert.FromByteArrayToString(this.bytes, this.encoding);
    }

    lines() {
        return this.toString().split("\n");
    }
}

File.load = (path) => {
    const loadedFile = new melon_internal_file(path);

    return new File({
        name: loadedFile.Name,
        bytes: loadedFile.Bytes,
        encoding: loadedFile.Encoding,
        creationTime: loadedFile.CreationTime,
        latWriteTime: loadedFile.LastWriteTime,
        path: loadedFile.FilePath
    });
}

File.delete = (path) => {
    melon_internal_delete_file(path);
}

File.copy = (from, to) => {
    melon_internal_copy_file(from, to);
}

File.move = (from, to) => {
    melon_internal_move_file(from, to);
}